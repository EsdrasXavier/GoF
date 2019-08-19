
class Context(object):

  def __init__(self, _input, *args, **kwargs):
    self._input = _input
    self._output = 0

  @property
  def input(self):
    return self._input

  @input.setter
  def input(self, _i):
    self._input = _i

  @property
  def output(self):
    return self._output

  @output.setter
  def output(self, _o):
    self._output = _o



if __name__ == '__main__':
  a = Context('a')
  print('Input: %s' % a.input)
  print('Output: %s' % a.output)
  a.input = 'sad'
  a.output = 'uiop'
  print('Input: %s' % a.input)
  print('Output: %s' % a.output)