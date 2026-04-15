import os
import glob

def fix_sidebar(file_path):
    with open(file_path, 'r') as f:
        content = f.read()

    # Apply responsive aside
    content = content.replace(
        '<aside className="fixed left-0 top-0 h-screen w-64 bg-white/60 backdrop-blur-xl border-r border-white/50 flex flex-col p-4 space-y-2 pointer-events-auto z-[100]">',
        '<aside className="fixed left-0 bottom-0 lg:top-0 h-16 lg:h-screen w-full lg:w-64 bg-white/60 backdrop-blur-xl border-t lg:border-t-0 lg:border-r border-white/50 flex flex-row lg:flex-col items-center lg:items-stretch overflow-x-auto lg:overflow-visible p-2 lg:p-4 space-x-2 lg:space-x-0 lg:space-y-2 pointer-events-auto z-[100] scrollbar-hide">'
    )
    
    # Hide brand on mobile
    content = content.replace(
        '<div className="flex items-center gap-3 px-4 py-6 mb-4">',
        '<div className="hidden lg:flex items-center gap-3 px-4 py-6 mb-4">'
    )

    # Make nav horizontal on mobile
    content = content.replace(
        '<nav className="flex-1 space-y-1">',
        '<nav className="flex flex-row lg:flex-col flex-1 space-x-2 lg:space-x-0 lg:space-y-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">'
    )

    # Ensure link sizes are nice on mobile
    content = content.replace(
        'className="text-sm"',
        'className="text-xs lg:text-sm whitespace-nowrap"'
    )

    # Hide logout on mobile
    content = content.replace(
        '<div className="pt-4 mt-auto border-t border-white/40">',
        '<div className="hidden lg:block pt-4 mt-auto border-t border-white/40">'
    )

    with open(file_path, 'w') as f:
        f.write(content)

for file in glob.glob("app/(dashboard)/petani/**/*.tsx", recursive=True):
    fix_sidebar(file)

