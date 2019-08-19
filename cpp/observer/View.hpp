#pragma once

#include "Observer.hpp"

#ifndef VIEW_H
#define VIEW_H

class View : public Observer {
private:
  int value;

public:
  inline View() {
    std::cout << "Obj: " << this << ". Created \n";
  };

  inline ~View() { };

  inline void update(int val) {
    this->value = val;
    std::cout << "Obj: " << this << ". Updated, new value: " << val << std::endl;
  };
};

#endif