import pygame
class Draw:
    @staticmethod
    def useImage(x, y, w, surface, imname):
        im = pygame.image.load("assets/"+imname+".png")
        x0 = x * w
        y0 = y * w
        surface.blit(pygame.transform.scale(im, (w,w)), (x0,y0))

    @staticmethod
    def color(x, y, w, surface, color):
        x0 = x * w
        y0 = y * w
        x1 = (x+1) * w
        y1 = (y+1) * w
        pygame.draw.polygon(surface, color, [(x0,y0),(x1,y0),(x1,y1),(x0,y1)])

    @staticmethod
    def shade(x, y, w, surface, color):
        x0 = x * w
        y0 = y * w
        x1 = (x+1) * w
        y1 = (y+1) * w
        pygame.draw.polygon(surface, color, [(x0,y0),(x1,y0),(x0,y1)],0)
    
    @staticmethod
    def label(x, y, w, surface, color, margin):
        x0 = x * w + (margin*w)
        y0 = y * w + (margin*w)
        x1 = (x+1) * w - (margin*w)
        y1 = (y+1) * w - (margin*w)
        pygame.draw.polygon(surface, color, [(x0,y0),(x1,y0),(x1,y1),(x0,y1)],0)