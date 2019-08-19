#include <iostream>
#include "View.hpp"
#include "Subject.hpp"


int main(int argv, char **argc) {
  int v;
  Subject *subject = new Subject();

  View *a = new View();
  View *b = new View();
  View *c = new View();

  subject->attach(a);
  subject->attach(b);
  subject->attach(c);

  while (1) {
    std::cout << "Type a number: " ;
    std::cin >> v;
    subject->setState(v);
  }

  return 0;
}