/* eslint-env jest */

const StoryElement = require('../src/story-element')
const Scene = require('../src/scene')
const ProgressBar = require('../src/progress-bar')
const Narrative = require('../src/narrative')
const Adventure = require('../src/adventure')

beforeEach(() => {
  // Valor "raro" para asegurar que los tests no dependen del valor por defecto
  Adventure.eol = '##END##'
})

describe('5.1 Clase Scene', () => {
  test('Crea class Scene', () => {
    expect(() => new Scene()).not.toThrow()
  })

  test('hereda de StoryElement', () => {
    const chapter = new Scene()
    expect(chapter instanceof StoryElement).toBeTruthy()
  })
})

describe('5.2 Scene tiene elementos (oculto)', () => {
  test('elements es oculto', () => {
    const chapter = new Scene()
    expect(chapter).toEqual({})
  })
  test('Scene tiene un método getElements()', () => {
    const chapter = new Scene()
    expect(chapter.getElements).toBeDefined()
  })
  test('Cuando se crea una scene, no tiene elementos', () => {
    const chapter = new Scene()
    expect(chapter.getElements().length).toBe(0)
  })
})

describe('5.3 addElements', () => {
  test('Existe el método addElements()', () => {
    const chapter = new Scene()
    expect(chapter.addElements).toBeDefined()
  })
  test('Se puede añadir un elemento', () => {
    const chapter = new Scene()
    const intro = new Narrative('Hola aventurero')
    chapter.addElements(intro)
    expect(chapter.getElements()).toContain(intro)
  })
  test('Se pueden añadir varios elementos a la vez', () => {
    const chapter = new Scene()
    const intro = new Narrative('Hola aventurero')
    const bar = new ProgressBar('+', 8)
    const body = new Narrative('Entras en la mazmorra')
    chapter.addElements(intro, bar, body, bar)
    expect(chapter.getElements()).toContain(intro)
    expect(chapter.getElements()).toContain(body)
    expect(chapter.getElements()).toContain(bar)
    expect(chapter.getElements().length).toBe(4)
  })
})

describe('5.4 Restricción de tipo en addElements', () => {
  test('No permite añadir otros elementos que no sean del Tipo StoryElement', () => {
    const chapter = new Scene()
    chapter.addElements('algo', 3)
    chapter.addElements(['array'], { type: 'object' })
    chapter.addElements(new Date())
    // Adventure no hereda de StoryElement, así que no debería entrar
    chapter.addElements(new Adventure('Aventura de prueba'))
    expect(chapter.getElements().length).toBe(0)
  })

  test('Permite añadir otra Scene (anidamiento)', () => {
    const chapter = new Scene()
    const subchapter = new Scene()
    chapter.addElements(subchapter)
    expect(chapter.getElements().length).toBe(1)
    expect(chapter.getElements()).toContain(subchapter)
  })
})

describe('5.5 Calcular memoria (calculateMemory)', () => {
  test('Existe el método calculateMemory', () => {
    const chapter = new Scene()
    expect(chapter.calculateMemory).toBeDefined()
  })
  test('Una escena vacía consume 0 memoria', () => {
    const chapter = new Scene()
    expect(chapter.calculateMemory()).toBe(0)
  })
  test('Una escena con varios elementos suma la memoria de todos', () => {
    const chapter = new Scene()
    const intro = new Narrative('Hola aventurero') // 2 palabras
    const bar = new ProgressBar('+', 8)            // 0 palabras
    const body = new Narrative('Entras ya')        // 2 palabras
    chapter.addElements(intro, bar, body, bar)
    expect(chapter.calculateMemory()).toBe(4)
  })

  test('No cuenta los espacios en blanco (delegado en Narrative)', () => {
    const chapter = new Scene()
    const intro = new Narrative('Hola mundo')
    const body = new Narrative('Lorem    ipsum    ') // 2 palabras aunque haya espacios
    chapter.addElements(intro, body)
    expect(chapter.calculateMemory()).toBe(4)
  })

  test('Cuenta incluso dentro de sub-escenas (recursividad)', () => {
    const mainScene = new Scene()
    const subScene1 = new Scene()
    const subScene2 = new Scene()
    
    const text1 = new Narrative('Hola mundo') // 2
    const text2 = new Narrative('Fin partida') // 2
    
    // Estructura: Main -> [Text1, Sub1 -> [Text1, Sub2 -> [Text1, Text2]]]
    // Total Text1 (2) + Text1 (2) + Text1 (2) + Text2 (2) = 8
    
    subScene2.addElements(text1, text2)
    subScene1.addElements(text1, subScene2)
    mainScene.addElements(text1, subScene1)
    
    expect(mainScene.calculateMemory()).toBe(8)
  })
})

describe('5.6 Método render', () => {
  test('Una escena vacía renderiza cadena vacía', () => {
    const chapter = new Scene()
    expect(chapter.render()).toBe('')
  })

  test('Una escena con un texto, devuelve ese texto con un salto de linea', () => {
    Adventure.eol = '<br>'
    const chapter = new Scene()
    const intro = new Narrative('Hola mundo')
    chapter.addElements(intro)
    expect(Adventure.eol).toBe('<br>')
    expect(chapter.render()).toBe('Hola mundo<br>')
  })

  test('Una escena con varios textos concatena sus renderizados', () => {
    Adventure.eol = '<br>'
    const chapter = new Scene()
    const intro = new Narrative('Hola mundo')
    const body = new Narrative('Lorem ipsum')
    chapter.addElements(intro, body)
    
    expect(chapter.render()).toBe('Hola mundo<br>Lorem ipsum<br>')
  })
})