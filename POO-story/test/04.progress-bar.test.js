/* eslint-env jest */

const StoryElement = require('../src/story-element')
const Adventure = require('../src/adventure')
const ProgressBar = require('../src/progress-bar')

// Configuración previa para asegurar un entorno limpio en cada test
beforeEach(() => {
  Adventure.eol = '\n'
})

describe('4.1 Clase ProgressBar', () => {
  test('Se construye la clase', () => {
    expect(() => new ProgressBar()).not.toThrow()
  })

  test('Hereda de StoryElement', () => {
    const bar = new ProgressBar()
    expect(bar instanceof StoryElement).toBeTruthy()
  })
})

describe('4.2 Propiedades symbol y value', () => {
  test('Recibe dos parámetros: symbol y value', () => {
    const bar = new ProgressBar('=', 50)
    expect(bar.symbol).toBe('=')
    expect(bar.value).toBe(50)
  })

  test('Si al construir no se le pasan parámetros, tendrá como symbol "#" y value 20', () => {
    const bar = new ProgressBar()
    expect(bar.symbol).toBe('#')
    expect(bar.value).toBe(20)
  })
})

describe('4.3 Renderizar ProgressBar', () => {
  test('render() imprime el symbol el número de veces que indica value y un salto de línea de Adventure', () => {
    const bar = new ProgressBar('*', 5)
    // Esperamos 5 asteriscos y el salto de línea por defecto (\n)
    expect(bar.render()).toBe('*****\n')
  })

  test('render() funciona incluso cambiando el eol de la Adventure', () => {
    const bar = new ProgressBar('*', 5)
    
    // Cambiamos la configuración estática global
    Adventure.eol = '|'
    expect(bar.render()).toBe('*****|')
    
    // Restauramos y verificamos de nuevo
    Adventure.eol = '\n'
    expect(bar.render()).toBe('*****\n')
  })
})