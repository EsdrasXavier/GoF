
"""
Define a one-to-many dependency between objects so that when one object
changes state, all its dependents are notified and updatedautomatically.
"""

import time
from subject import Subject
from observer import Observer
from tkinter import *


class Note(Toplevel, Observer):
  nid = 0
  #title = "" #this would block the method to override the current title
  message = ""

  def __init__(self, master, nid, title, message):
    Toplevel.__init__(self,master)
    self.nid = nid
    self.title(title) #since toplevel widgets define a method called title you can't store it as an attribute
    self.message = message
    self.display_note_gui() #maybe just leave that code part of the __init__?


  def display_note_gui(self):
    '''Tkinter to create a note gui window with parameters '''
    #no window, just self
    self.geometry("200x200")
    self.configure(background="#BAD0EF")
    title = Entry(self,relief=FLAT, bg="#BAD0EF", bd=0)
    title.pack(side=TOP)
    self.textArea = Label(self, text=self.message,
                          height=4, width=1000,
                          bg="#BAD0EF",
                          font=("Times", "14"))
    self.textArea.pack(side=RIGHT, fill=Y)

  def run(self):
    self.display_note_gui()

  def update_txt(self, arg):
    self._observer_state = arg
    self.message = arg
    self.textArea.config(text=self.message)


class MainView:
  def __init__(self, master, subject):
    master.title("A simple GUI")
    self.i = 0
    self.master = master
    self.subject = subject

    self.label = Label(master, text="Update all views!")
    self.label.pack()

    self.greet_button = Button(master, text="Increase",
                               command=self.greet)
    self.greet_button.pack()

    self.close_button = Button(master, text="Close",
                               command=master.quit)
    self.close_button.pack()

  def greet(self):
    self.i += 1
    self.subject.subject_state = self.i


def main():

  root = Tk()
  subject = Subject()
  _views = []

  for i in range(5):
    _views.append(Note(root, i, 'View %i' %i, ''))

  for v in _views:
    subject.attach(v)

  my_gui = MainView(root, subject)
  root.mainloop() #still call mainloop on the root

if __name__ == "__main__":
    main()