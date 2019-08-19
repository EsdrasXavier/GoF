from context import Context
from expression import *

def main():
  data = str(input('Entre com o algorismo romano: ')).upper()

  context = Context(data)

  tree = []
  tree.append(ThousandExpression())
  tree.append(HundredExpression())
  tree.append(TenExpression())
  tree.append(OneExpression())

  for it in tree:
    it.interpret(context)

  print('Algorismo digitado: {} -- Interpretado para: {}'.format(data, context.output))


if __name__ == '__main__':
  main()