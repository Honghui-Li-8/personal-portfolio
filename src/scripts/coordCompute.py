def getCoord(x, y):
    coord_x = round((x-27)/(1401-27), 3)
    coord_y = round((-y+10)/(995-10), 3)
    
    return [coord_x, abs(coord_y)]
    
def getIntersect(p1, p2, p3, p4):
    x1, y1 = p1
    x2, y2 = p2
    x3, y3 = p3
    x4, y4 = p4

    # Calculate the differences
    denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
    
    # Check if lines are parallel (denominator = 0)
    if denominator == 0:
        return None  # No intersection

    # Calculate the x and y coordinates of the intersection
    intersect_x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denominator
    intersect_y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denominator

    return (intersect_x, intersect_y) # -y since is filliped for UI


# Main
    
top_left = [27, 10]
top_right = [1401, 10]
bottom_left = [27, 995]
bottom_right = [1401, 995]

## Old layout
# l1_s = [323, 10]
# l1_e = [154, 995]

# l2_s = [733, 10]
# l2_e = [1401, 436]

# l3_s = [958, 10]
# l3_e = [27, 446]

# l4_s = [1401, 626]
# l4_e = [1029, 995]

# l5_s = [1401, 769]
# l5_e = [27, 892]

## base layout --------------------------------
# l1_s = [323 - 30, 10]
# l1_e = [154 - 80, 995]

# l2_s = [733 + 120, 10]
# l2_e = [1401, 436 - 150]

# l3_s = [958, 10]
# l3_e = [27, 446 - 80]

# l4_s = [1401, 626]
# l4_e = [1029, 995]

# l5_s = [1401, 769 + 20]
# l5_e = [27, 892 + 30]

## focus 5 (center) layout --------------------------------
l1_s = [323 - 30 - 30, 10]
l1_e = [154 - 80 - 30, 995]

l2_s = [733 + 120 + 30, 10]
l2_e = [1401, 436 - 150 - 40]

l3_s = [958 - 40, 10]
l3_e = [27, 446 - 80 - 20]

l4_s = [1401, 626 + 50]
l4_e = [1029 + 60, 995]

l5_s = [1401, 769 + 20 + 30]
l5_e = [27, 892 + 30 + 30]


l1_l3 = getIntersect(l1_s, l1_e, l3_s, l3_e)
l2_l3 = getIntersect(l2_s, l2_e, l3_s, l3_e)
l1_l5 = getIntersect(l1_s, l1_e, l5_s, l5_e)
l4_l5 = getIntersect(l4_s, l4_e, l5_s, l5_e)


sections = [
    [top_left, l1_s, l1_l3, l3_e],
    [l1_s, l1_l3, l2_l3, l2_s],
    [l2_s, l2_l3, l3_s],
    [l3_s, l2_l3, l2_e, top_right],
    [l3_e, l1_l3, l1_l5, l5_e],
    [l1_l3, l2_l3, l2_e, l4_s, l4_l5, l1_l5],
    [l4_s, l4_l5, l5_s],
    [l5_e, l1_l5, l1_e, bottom_left],
    [l1_e, l1_l5, l4_l5, l4_e],
    [l4_e, l4_l5, l5_s, bottom_right]
]

result = []


for section in sections:
    sec_result = []
    for p in section:
        sec_result.append(getCoord(p[0], p[1]))
    
    result.append(sec_result)
    
print(result)