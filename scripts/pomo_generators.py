#!/usr/bin/python3

import random
import math

'''
sumg 
name lenght

'''
num_cases = 300

# def name_gen():
#     ans = 'a'
#     cur_char = 'a'
#     while True:
#         yield ans
#         if(ans[-1] == 'z'):
#             ans += 'a'
#         ans[-1] += 1

def name_gen():
    num = 0
    while True:
        yield "song_%d" % (num)
        num += 1

def number_gen():
    while True:
        thing = math.floor(random.normalvariate(3.5,0.5) * 60.0)
        yield thing


if __name__=='__main__':
    global num_cases
    next_name = name_gen()
    next_number = number_gen()
    num = 0
    print("%d" % 1500)
    while num != num_cases:
        thing = next(next_number)
        if(thing > 0):
            print("%s %d" % (next(next_name), next(next_number)) )
            num += 1

