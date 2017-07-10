# coding=utf-8
from scipy.optimize import linprog
import math


# requires: Ax <= b, A_eq*x == b_eq, and x >= 0. These are all python lists
# param di: The discretionary interval for the variable set.
#			di=0 or di=None: Treat as regular continuous linear program
#			di=1: Corresponding variable must be an integer value
#			di may be a list of len(c) numerical values or a single numerical value.
# The list indicates the corresponding variable's interval constraint.
# A single numerical value indicates that all variables share the same interval.
# param answer: Used for debugging.
# param callback: same attributes as the linprog parameter. Used for debugging.
# returns:	The optimal x-vector and the value of the objective function.

def intprog(c, A, b, A_eq=None, b_eq=None, di=None, answer=None, callback=None):
    global data
    data = {
        "profit":None,
        "optimal x":[0] * len(c),
        "solution":answer,
        "callback":callback,
        "c":[-z for z in c],
        "var count": None,
        "constraints": None,
        # The precision-level allows for simplicity when comparing imprecise floating values to one another. Typically,
        # we want to have PRECISION <= di * 0.01, where di is the required discretionary interval
        "precision":list(),

        # Current Soultuin
    }
