from cell import Cell
from colors import Color3
import random
import pygame
import numpy as np

class Minesweeper:
    def __init__(self):
        
        self.tile_width = 25
        self.rows, self.columns = 16,30
        self.grid = [] 
        self.bombs = 99

        height = self.columns * self.tile_width
        width = self.rows * self.tile_width

        pygame.init()
        self.surface = pygame.display.set_mode((height, width))
        pygame.display.set_caption("Minesweeper")

    def makeCells(self):
        for row in range(self.rows):
            for column in range(self.columns):
                grid_cell = Cell(column, row, self.tile_width)
                self.grid.append(grid_cell)

    def valid(self, i, j):
        return (
            i>=0 and i<self.columns and
            j>=0 and j<self.rows and
            self.grid[i + j*self.columns]._type!=-1
        )

    def incrementSurrounding(self, random_cell):
        x = random_cell.x_coordinate
        y = random_cell.y_coordinate
        rng = [-1,0,1]
        for i in rng:
            for j in rng:
                if (i!=0 or j!=0) and self.valid(x+i,y+j): 
                    self.grid[(x+i) + (y+j)*self.columns]._type+=1

    def setBombs(self):
        for _ in range(self.bombs):
            random_cell = random.choice(self.grid)
            while random_cell._type == -1:
                random_cell = random.choice(self.grid)
            random_cell._type = -1
            self.incrementSurrounding(random_cell)

            user_action = pygame.event.poll()
            if user_action.type == pygame.QUIT:
                pygame.quit()
                break
            self.show()
            pygame.time.wait(100)

    def show(self):
        if self.grid:  # displays the tiles
            for grid_cell in self.grid:
                grid_cell.draw(self.surface)
        pygame.display.flip()  # update the canvas so the grid will be shown after it is drawn
            

    def create(self):

        self.makeCells()
        self.setBombs()

        clock = pygame.time.Clock()

        while True:
            user_action = pygame.event.poll()
            if user_action.type == pygame.QUIT:
                pygame.quit()
                break
            
            self.show()