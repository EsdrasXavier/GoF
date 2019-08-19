#include "Subject.hpp"

Subject::Subject() {
  this->state = 0;
}

Subject::~Subject() {

}

void Subject::attach(View *a) {
  this->observers.push_back(a);
}

void Subject::detach(View *a) {
  /* TODO: Implement this method */
}

void Subject::notify() {
  auto it = this->observers.begin();
  auto end = this->observers.end();

  for (View *v : this->observers)
    v->update(this->state);
}

void Subject::setState(int s) {
  this->state = s;
  this->notify();
}