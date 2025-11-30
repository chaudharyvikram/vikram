import urllib.request
import re

apps = [
    ("Calliope Stories", "https://apps.apple.com/in/app/calliope-stories/id6447096686"),
    ("Fit-2-Flaunt", "https://apps.apple.com/in/app/fit-2-flaunt/id1501799266"),
    ("Veena World", "https://apps.apple.com/in/app/veena-world/id6741761791"),
    ("Radio Nova Toronto", "https://apps.apple.com/in/app/radio-nova-toronto/id1454401999"),
    ("Host for Radionova", "https://apps.apple.com/in/app/host-for-radionova/id6746206032"),
    ("Sarafiy", "https://apps.apple.com/in/app/sarafiy-%D8%B5%D8%B1%D8%A7%D9%81%DB%8C/id6477912439"),
    ("Footrax", "https://apps.apple.com/in/app/footrax/id1594586162"),
    ("Clique", "https://apps.apple.com/in/app/clique-the-rewards-app/id6741565671"),
    ("LMC", "https://apps.apple.com/in/app/lmc-global-container-hub/id6741157742")
]

for title, url in apps:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
            # Try to find og:image
            match = re.search(r'property="og:image" content="([^"]*)"', html)
            if match:
                print(f"{title}: {match.group(1)}")
            else:
                print(f"{title}: Not found")
    except Exception as e:
        print(f"{title}: Exception {e}")
