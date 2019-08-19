#include <iostream>
#include <string>

#include "Context.hpp"

#ifndef EXPRESSION_H
#define EXPRESSION_H

class Expression {

public:
  inline Expression() { };
  inline ~Expression() { };

  virtual void interpret(Context *context) {
    if (context->getInput().size() == 0)
      return ;

    if (context->getInput().rfind(this->nine(), 0) == 0) {
      context->setOutput(context->getOutput() + (9 * this->multiplier()));
      context->setInput(context->getInput().substr(2));
    } else if (context->getInput().rfind(this->four(), 0) == 0) {
      context->setOutput(context->getOutput() + (4 * this->multiplier()));
      context->setInput(context->getInput().substr(2));
    } else if (context->getInput().rfind(this->five(), 0) == 0) {
      context->setOutput(context->getOutput() + (5 * this->multiplier()));
      context->setInput(context->getInput().substr(1));
    }
    while (context->getInput().rfind(this->one(), 0) == 0) {
      context->setOutput(context->getOutput() + (1 * this->multiplier()));
      context->setInput(context->getInput().substr(1));
    }
  };

  virtual std::string one() = 0;
  virtual std::string four() = 0;
  virtual std::string five() = 0;
  virtual std::string nine() = 0;
  virtual int multiplier() = 0;
};


class ThousandExpression : public Expression {
public:
  inline std::string one() {
    return "M";
  };

  inline std::string four() {
    return " ";
  };

  inline std::string five() {
    return " ";
  };

  inline std::string nine() {
    return " ";
  };

  inline int multiplier() {
    return 1000;
  };
};

class HundredExpression : public Expression {
public:
  inline std::string one() {
    return "C";
  };

  inline std::string four() {
    return "CD";
  };

  inline std::string five() {
    return "D";
  };

  inline std::string nine() {
    return "CM";
  };

  inline int multiplier() {
    return 100;
  };
};

class TenExpression : public Expression {
public:
  inline std::string one() {
    return "X";
  };

  inline std::string four() {
    return "XL";
  };

  inline std::string five() {
    return "L";
  };

  inline std::string nine() {
    return "XC";
  };

  inline int multiplier() {
    return 10;
  };
};

class OneExpression : public Expression {
public:
  inline std::string one() {
    return "I";
  };

  inline std::string four() {
    return "IV";
  };

  inline std::string five() {
    return "V";
  };

  inline std::string nine() {
    return "IX";
  };

  inline int multiplier() {
    return 1;
  };
};
#endif