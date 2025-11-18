/* eslint-env jest */

const StoryElement = require('../src/story-element')

describe('1.1 Clase StoryElement', () => {
  test('Existe la clase StoryElement', () => {
    expect(() => new StoryElement()).not.toThrow()
  })
})

describe('1.2 Método render', () => {
  test('Tiene un método render', () => {
    const element = new StoryElement()
    expect(element.render).toBeDefined()
  })

  test('El método render devuelve una cadena vacía por defecto', () => {
    const element = new StoryElement()
    expect(element.render()).toBe('')
  })
})

describe('1.3 Método calculateMemory', () => {
  test('Tiene un método para calcular el coste de memoria', () => {
    const element = new StoryElement()
    expect(element.calculateMemory).toBeDefined()
  })

  test('El método calculateMemory devuelve 0 en los elementos base sin contenido', () => {
    const element = new StoryElement()
    expect(element.calculateMemory()).toBe(0)
  })
})