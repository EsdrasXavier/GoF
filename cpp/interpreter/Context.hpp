#pragma once

#include <iostream>

#ifndef CONTEXT_H
#define CONTEXT_H

class Context {
private:
  std::string input;
  int output;

public:
  inline Context(std::string input) {
    this->input = input;
    this->output = 0;
  };

  inline void setInput(std::string input) {
    this->input = input;
  };

  inline std::string getInput() {
    return this->input = input;
  };

  inline void setOutput(int out) {
    this->output = out;
  };

  inline int getOutput() {
    return this->output;
  };
};

#endif