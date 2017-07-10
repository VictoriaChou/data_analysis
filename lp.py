# coding=utf-8
import numpy as np
import matplotlib.pyplot as mpl
from scipy.optimize import linprog

c = np.array([1,1,1])
a = np.array([3.05,4.05,6.1])
b = np.array([7.9])

res = linprog(c,-a,b)

print (res.x)

