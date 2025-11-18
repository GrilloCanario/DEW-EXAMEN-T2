/* eslint-env jest */

const StoryElement = require('../src/story-element')
const Narrative = require('../src/narrative')
const Adventure = require('../src/adventure')

// Nos aseguramos de que el salto de línea sea el estándar antes de cada test
beforeEach(() => {
  Adventure.eol = '\n'
})

describe('3.1 Clase Narrative', () => {
  test('Se crea la clase Narrative', () => {
    expect(() => new Narrative()).not.toThrow()
  })

  test('La clase Narrative hereda de StoryElement', () => {
    const storyText = new Narrative()
    expect(storyText instanceof StoryElement).toBeTruthy()
  })
})

describe('3.2 Constructor', () => {
  test('Se construye con un texto (content) como parámetro', () => {
    const storyText = new Narrative('En un lugar de la Mancha...')
    expect(storyText.content).toBe('En un lugar de la Mancha...')
  })

  test('Sin parámetro almacena una cadena vacía', () => {
    const emptyText = new Narrative()
    expect(emptyText.content).toBe('')
  })
})

describe('3.3 Método render', () => {
  test('Devuelve el contenido seguido del salto de línea de la aventura', () => {
    const storyText = new Narrative('El dragón despertó.')
    expect(storyText.render()).toBe('El dragón despertó.\n')
  })

  test('Funciona incluso cambiando el eol de la Adventure', () => {
    const storyText = new Narrative('El dragón despertó.')
    
    // Comprobamos estado inicial
    expect(storyText.render()).toBe('El dragón despertó.\n')
    
    // Cambiamos la propiedad estática
    Adventure.eol = '<br>'
    
    // Comprobamos que Narrative lee la propiedad estática de Adventure
    expect(storyText.render()).toBe('El dragón despertó.<br>')
  })
})

describe('3.4 Método calculateMemory', () => {
  test('Cuenta las palabras (separadas por espacios)', () => {
    const storyText = new Narrative('El tesoro está oculto')
    // "El", "tesoro", "está", "oculto" = 4 palabras
    expect(storyText.calculateMemory()).toBe(4)
  })

  test('No cuenta como palabras varios espacios seguidos', () => {
    const storyText = new Narrative('  El   tesoro      está  oculto      ')
    // Debe ignorar los espacios iniciales, finales y los múltiples intermedios
    expect(storyText.calculateMemory()).toBe(4)
  })
})