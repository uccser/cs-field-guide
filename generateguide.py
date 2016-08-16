import os
WD = os.getcwd()
os.chdir(os.path.dirname(os.path.abspath(__file__)))

from generator.run import run

if __name__ == "__main__":
    run()

os.chdir(WD)
