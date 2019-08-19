from abc import ABC, abstractmethod
from context import Context

class Expression(ABC):

  def interpret(self, context):
    if len(context.input) == 0:
      return

    if context.input.startswith(self.nine()):
      context.output = context.output + (9 * self.multiplier())
      context.input = context.input[2::]
    elif context.input.startswith(self.four()):
      context.output = context.output + (4 * self.multiplier())
      context.input = context.input[2::]
    elif context.input.startswith(self.five()):
      context.output = context.output + (5 * self.multiplier())
      context.input = context.input[1::]

    while context.input.startswith(self.one()):
      context.output = context.output + (1 * self.multiplier())
      context.input = context.input[1::]

  def one(self):
    pass

  def four(self):
    pass

  def five(self):
    pass

  def nine(self):
    pass

  def multiplier(self):
    pass


class ThousandExpression(Expression):
  def one(self):
    return 'M'

  def four(self):
    return ' '

  def five(self):
    return ' '

  def nine(self):
    return ' '

  def multiplier(self):
    return 1000


class HundredExpression(Expression):

  def one(self):
    return "C"

  def four(self):
    return "CD"

  def five(self):
    return "D"

  def nine(self):
    return "CM"

  def multiplier(self):
    return 100


class TenExpression(Expression):
  def one(self):
    return "X"

  def four(self):
    return "XL"

  def five(self):
    return "L"

  def nine(self):
    return "XC"

  def multiplier(self):
    return 10


class OneExpression(Expression):
  def one(self):
    return "I"

  def four(self):
    return "IV"

  def five(self):
    return "V"

  def nine(self):
    return "IX"

  def multiplier(self):
    return 1


if __name__ == '__main__':
  a = Context('MCMXXVIII')
  b = Expression()
  print(a.input)

  tree = []
  tree.append(ThousandExpression())
  tree.append(HundredExpression())
  tree.append(TenExpression())
  tree.append(OneExpression())

  for it in tree:
    it.interpret(a)

  print(a.output)

