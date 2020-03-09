import pygame
from colors import Color3
import random
from draw import Draw

# cell types: normal, start, end

class Cell:
    def __init__(self, x_coordinate, y_coordinate, width):

        self.x_coordinate = x_coordinate
        self.y_coordinate = y_coordinate
        self.__width = width
        self._type = 0
        self._opened = random.choice([True,False])
        #self._opened = True
        self._next = []

    def draw(self, surface):    

        x = self.x_coordinate
        y = self.y_coordinate
        w = self.__width

        Draw.color(x, y, w, surface, Color3.darkGray)  
        if not self._opened:  
            Draw.useImage(x, y, w, surface, "tile")
        else:
            Draw.useImage(x, y, w, surface, str(self._type))

    def get_cell(self, column_count):
        return self.x_coordinate + (self.y_coordinate * column_count)