#pragma once

#include <iostream>

#ifndef OBSERVER_H
#define OBSERVER_H

class Observer {
private:
  int state;

public:
  inline Observer() { };
  inline ~Observer() { };

  virtual void update(int val) = 0;
};

#endif