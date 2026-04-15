import re
import glob

def o(path):
    with open(path, 'r') as f:
        c = f.read()

    ps = {
        r'(?<![-a-z])p-8\b': 'p-4 sm:p-6 lg:p-8',
        r'(?<![-a-z])p-10\b': 'p-4 sm:p-6 lg:p-10',
        r'(?<![-a-z])p-12\b': 'p-6 sm:p-8 lg:p-12',
        r'(?<![-a-z])px-10\b': 'px-4 sm:px-6 lg:px-10',
        r'(?<![-a-z])py-10\b': 'py-6 lg:py-10',
        r'(?<![-a-z])py-12\b': 'py-8 lg:py-12',
        r'(?<![-a-z])py-16\b': 'py-10 lg:py-16',
        r'(?<![-a-z])gap-8\b': 'gap-4 lg:gap-8',
        r'(?<![-a-z])gap-10\b': 'gap-6 lg:gap-10',
        r'(?<![-a-z])text-3xl\b': 'text-2xl md:text-3xl',
        r'(?<![-a-z])text-4xl\b': 'text-2xl sm:text-3xl md:text-4xl',
        r'(?<![-a-z])text-5xl\b': 'text-3xl md:text-5xl',
        r'(?<![-a-z])text-6xl\b': 'text-4xl md:text-6xl',
    }

    og = c
    for p, r in ps.items():
        c = re.sub(p, r, c)

    c = c.replace('sm:grid-cols-1 sm:grid-cols-2', 'sm:grid-cols-2')
    
    if c != og:
        with open(path, 'w') as f:
            f.write(c)
        print(f"Opt: {path}")

for f in glob.glob("app/**/*.tsx", recursive=True): o(f)
