import re
import glob

def o(path):
    with open(path, 'r') as f:
        c = f.read()

    ps = {
        r'(?<![-a-z])grid-cols-2\b': 'grid-cols-1 sm:grid-cols-2',
        r'(?<![-a-z])grid-cols-3\b': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        r'(?<![-a-z])grid-cols-4\b': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        r'sm:grid-cols-1 sm:grid-cols-2': 'sm:grid-cols-2',
        r'sm:grid-cols-2 sm:grid-cols-2': 'sm:grid-cols-2',
        r'sm:grid-cols-1 md:grid-cols-2': 'md:grid-cols-2',
        r'grid-cols-1 grid-cols-1': 'grid-cols-1',
    }

    og = c
    for p, r in ps.items():
        c = re.sub(p, r, c)

    # Let's fix duplicated grid-cols-1 caused by running this on already adapted tags:
    c = c.replace('grid-cols-1 md:grid-cols-3', 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3') 
    
    if c != og:
        with open(path, 'w') as f:
            f.write(c)
        print(f"Opt grid: {path}")

for f in glob.glob("app/**/*.tsx", recursive=True): o(f)
