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

red_s = [323, 10]
red_e = [154, 995]

blue_s = [733, 10]
blue_e = [1401, 436]

org_s = [958, 10]
org_e = [27, 446]

green_s = [1401, 626]
green_e = [1029, 995]

black_s = [1401, 769]
black_e = [27, 892]

red_org = getIntersect(red_s, red_e, org_s, org_e)
blue_org = getIntersect(blue_s, blue_e, org_s, org_e)
red_black = getIntersect(red_s, red_e, black_s, black_e)
green_black = getIntersect(green_s, green_e, black_s, black_e)


sections = [
    [top_left, red_s, red_org, org_e],
    [red_s, red_org, blue_org, blue_s],
    [blue_s, blue_org, org_s],
    [org_s, blue_org, blue_e, top_right],
    [org_e, red_org, red_black, black_e],
    [red_org, blue_org, blue_e, green_s, green_black, red_black],
    [green_s, green_black, black_s],
    [black_e, red_black, red_e, bottom_left],
    [red_e, red_black, green_black, green_e],
    [green_e, green_black, black_s, bottom_right]
]

result = []


for section in sections:
    sec_result = []
    for p in section:
        sec_result.append(getCoord(p[0], p[1]))
    
    result.append(sec_result)
    
print(result)