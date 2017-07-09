import numpy as np
import matplotlib.pyplot as mpl
from scipy import optimize

c = np.array([1,1,1])
a = np.array([3.05,4.05,6.1])
b = np.array([7.9])

res = optimize.linprog(c,-a,b)

print (res.x)

