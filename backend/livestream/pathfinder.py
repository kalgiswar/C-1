import heapq
import cv2
import numpy as np

class Pathfinder:
    def __init__(self, cols=20, rows=20, cell_size=20):
        self.cols = cols
        self.rows = rows
        self.cell_size = cell_size
        self.width = cols * cell_size
        self.height = rows * cell_size
        self.start = (1, 1)
        self.end = (self.cols - 2, self.rows - 2)

    def heuristic(self, a, b):
        return abs(a[0] - b[0]) + abs(a[1] - b[1])

    def get_zone_cost(self, x, y, density_map):
        # density_map is a dict containing {"cam1": cost, "cam2": cost, "cam3": cost, "cam4": cost}
        # default cost is 1
        zone = "cam1"
        half_x = self.cols // 2
        half_y = self.rows // 2
        
        if x < half_x and y < half_y:
            zone = "cam1"
        elif x >= half_x and y < half_y:
            zone = "cam2"
        elif x < half_x and y >= half_y:
            zone = "cam3"
        elif x >= half_x and y >= half_y:
            zone = "cam4"

        return density_map.get(zone, 1)

    def find_path(self, density_map):
        # density_map = {'cam1': 1, 'cam2': 50, ...}
        open_set = []
        heapq.heappush(open_set, (0, self.start))
        came_from = {}
        g_score = {(x, y): float('inf') for x in range(self.cols) for y in range(self.rows)}
        g_score[self.start] = 0
        f_score = {(x, y): float('inf') for x in range(self.cols) for y in range(self.rows)}
        f_score[self.start] = self.heuristic(self.start, self.end)

        while open_set:
            current = heapq.heappop(open_set)[1]

            if current == self.end:
                path = []
                while current in came_from:
                    path.append(current)
                    current = came_from[current]
                path.append(self.start)
                path.reverse()
                return path

            x, y = current
            neighbors = [(x+1, y), (x-1, y), (x, y+1), (x, y-1), (x+1, y+1), (x+1, y-1), (x-1, y+1), (x-1, y-1)]
            
            for nx, ny in neighbors:
                if 0 <= nx < self.cols and 0 <= ny < self.rows:
                    cost = self.get_zone_cost(nx, ny, density_map)
                    
                    # Ensure obstacles are not walkable if cost is very high
                    if cost > 1000:
                         continue
                         
                    tentative_g_score = g_score[current] + cost
                    if tentative_g_score < g_score[(nx, ny)]:
                        came_from[(nx, ny)] = current
                        g_score[(nx, ny)] = tentative_g_score
                        f_score[(nx, ny)] = tentative_g_score + self.heuristic((nx, ny), self.end)
                        # Check if it's already in the open set
                        if not any(item[1] == (nx, ny) for item in open_set):
                            heapq.heappush(open_set, (f_score[(nx, ny)], (nx, ny)))

        return [] # No path
        
    def generate_image(self, density_map):
        path = self.find_path(density_map)
        
        # Create a blank image (dark background)
        img = np.zeros((self.height, self.width, 3), dtype=np.uint8)
        
        # Draw Zones
        half_w = self.width // 2
        half_h = self.height // 2
        
        def safe_color(c):
             # Map cost to color (Safe = Green, High = Red)
             if c >= 50: return (0, 0, 150) # Dark Red for obstacle
             if c >= 10: return (0, 150, 150) # Yellow for crowded
             return (50, 50, 50) # Gray for normal

        cv2.rectangle(img, (0, 0), (half_w, half_h), safe_color(density_map.get('cam1', 1)), -1)
        cv2.rectangle(img, (half_w, 0), (self.width, half_h), safe_color(density_map.get('cam2', 1)), -1)
        cv2.rectangle(img, (0, half_h), (half_w, self.height), safe_color(density_map.get('cam3', 1)), -1)
        cv2.rectangle(img, (half_w, half_h), (self.width, self.height), safe_color(density_map.get('cam4', 1)), -1)
        
        # Draw labels
        cv2.putText(img, "Area 1", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
        cv2.putText(img, "Area 2", (half_w + 10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
        cv2.putText(img, "Area 3", (10, half_h + 30), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
        cv2.putText(img, "Area 4", (half_w + 10, half_h + 30), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)

        # Draw Grid lines (optional for visual effect)
        for x in range(0, self.width, self.cell_size):
            cv2.line(img, (x, 0), (x, self.height), (100, 100, 100), 1)
        for y in range(0, self.height, self.cell_size):
             cv2.line(img, (0, y), (self.width, y), (100, 100, 100), 1)

        # Draw Path
        if path:
            for i in range(len(path) - 1):
                p1 = (path[i][0] * self.cell_size + self.cell_size // 2, path[i][1] * self.cell_size + self.cell_size // 2)
                p2 = (path[i+1][0] * self.cell_size + self.cell_size // 2, path[i+1][1] * self.cell_size + self.cell_size // 2)
                cv2.line(img, p1, p2, (0, 255, 0), 4)
                
            # Draw Start and End
            sx, sy = self.start[0] * self.cell_size + self.cell_size//2, self.start[1] * self.cell_size + self.cell_size//2
            ex, ey = self.end[0] * self.cell_size + self.cell_size//2, self.end[1] * self.cell_size + self.cell_size//2
            cv2.circle(img, (sx, sy), 8, (255, 128, 0), -1) # Start: Blue
            cv2.circle(img, (ex, ey), 8, (255, 0, 255), -1) # End: Magenta
            
            cv2.putText(img, "START", (sx+10, sy), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 128, 0), 1)
            cv2.putText(img, "EXIT", (ex-40, ey-10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 255), 1)
        else:
             cv2.putText(img, "NO PATH FOUND (BLOCKED)", (50, half_h), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)

        # Encode
        ret, buffer = cv2.imencode('.jpg', img)
        if ret:
            return buffer.tobytes()
        return None
