#include <iostream>
#include <vector>
#include "Context.hpp"
#include "Expression.hpp"


int main(int argv, char **argc) {
  std::vector<Expression *> tree;
  std::string expression = "XVI";

  Context *context = new Context(expression);

  tree.push_back(new ThousandExpression());
  tree.push_back(new HundredExpression());
  tree.push_back(new TenExpression());
  tree.push_back(new OneExpression());

  for (Expression *e : tree)
    e->interpret(context);

  std::cout << expression << " -> " << context->getOutput() << std::endl;
  return 0;
}