"""On-demand link availability checks. No third-party texts are stored."""
import concurrent.futures
import datetime
import json
import pathlib
import urllib.error
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
catalog = json.loads((ROOT / 'resources.json').read_text(encoding='utf-8'))
urls = {}
for resource in catalog['resources']:
    for url, purpose in [(resource['primary'], 'official source'), (resource.get('pdf'), 'direct PDF')] + [(item['url'], 'reference or license') for item in resource['links'] + resource['evidence']]:
        if url:
            urls.setdefault(url, set()).add(purpose)

def check(entry):
    url, purposes = entry
    result = {'url': url, 'purpose': sorted(purposes), 'checked_at_utc': datetime.datetime.now(datetime.timezone.utc).isoformat()}
    request = urllib.request.Request(url, headers={'User-Agent': 'NeuromancerLibrary-LinkCheck/1.0 (availability check)'})
    try:
        with urllib.request.urlopen(request, timeout=25) as response:
            head = response.read(1024)
            result.update(status=response.status, final_url=response.url, content_type=response.headers.get('Content-Type', ''), pdf_header=head.lstrip().startswith(b'%PDF-'))
            is_pdf = 'direct PDF' in purposes
            result['result'] = 'verified' if 200 <= response.status < 300 and (not is_pdf or result['pdf_header']) else 'needs_review'
    except urllib.error.HTTPError as error:
        result.update(status=error.code, final_url=error.url, result='automated_access_blocked' if error.code in (401,403,429) else 'http_error')
    except Exception as error:
        result.update(result='network_error', error=str(error))
    return result

with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    results = list(pool.map(check, urls.items()))
report = {'generated_at_utc': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'license_review_date':catalog['checked'], 'method':'GET; follow redirects; read first 1024 bytes; verify PDF signature. Availability does not imply redistribution permission.', 'links':results}
(ROOT / 'link-check.json').write_text(json.dumps(report, indent=2)+'\n', encoding='utf-8')
print(json.dumps({'total':len(results),'verified':sum(x['result']=='verified' for x in results),'needs_review':[x for x in results if x['result']!='verified']},indent=2))
