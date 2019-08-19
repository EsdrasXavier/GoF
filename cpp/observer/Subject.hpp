#pragma once

#include <iostream>
#include <vector>
#include "View.hpp"

#ifndef SUBJECT_H
#define SUBJECT_H


class Subject {
private:
  int state;
  std::vector<View *> observers;

public:
  Subject();
  ~Subject();

  void attach(View *a);
  void detach(View *a);
  void notify();
  void setState(int s);
};

#endif