/* eslint-env jest */

const Scene = require('../src/scene')
const Narrative = require('../src/narrative')
const DialogueBlock = require('../src/dialogue-block')
const Adventure = require('../src/adventure')
const ProgressBar = require('../src/progress-bar')

beforeEach(() => {
  // Aseguramos el salto de línea estándar antes de cada test
  Adventure.eol = '\n'
})

describe('6.1 Clase DialogueBlock', () => {
  test('Crea class DialogueBlock', () => {
    expect(() => new DialogueBlock()).not.toThrow()
  })

  test('hereda de Scene', () => {
    const dialog = new DialogueBlock()
    expect(dialog instanceof Scene).toBeTruthy()
  })
})

describe('6.2 Solo puede contener Tipo Narrative', () => {
  test('Admite un componente de tipo Narrative', () => {
    const dialog = new DialogueBlock()
    const line1 = new Narrative('Hola viajero')
    dialog.addElements(line1)
    expect(dialog.getElements()).toContain(line1)
  })

  test('Admite varios componentes de tipo Narrative', () => {
    const dialog = new DialogueBlock()
    const line1 = new Narrative('Hola')
    const line2 = new Narrative('¿Quién eres?')
    const line3 = new Narrative('Soy el rey')
    dialog.addElements(line1, line2, line3)
    expect(dialog.getElements()).toContain(line1)
    expect(dialog.getElements()).toContain(line2)
    expect(dialog.getElements()).toContain(line3)
  })

  test('No admite un componente que no es de tipo Narrative', () => {
    const dialog = new DialogueBlock()
    const bar = new ProgressBar() // Es un StoryElement pero no Narrative
    const subScene = new Scene()  // Es un StoryElement pero no Narrative
    
    dialog.addElements(bar)
    dialog.addElements(subScene)
    
    expect(dialog.getElements()).not.toContain(bar)
    expect(dialog.getElements()).not.toContain(subScene)
    expect(dialog.getElements().length).toBe(0)
  })

  test('Admite varios componentes y descarta los que no son de tipo Narrative', () => {
    const dialog = new DialogueBlock()
    const line1 = new Narrative('Hola')
    const bar = new ProgressBar()
    const line2 = new Narrative('Adiós')
    
    dialog.addElements(line1, bar, line2)
    
    expect(dialog.getElements()).toContain(line1)
    expect(dialog.getElements()).not.toContain(bar)
    expect(dialog.getElements()).toContain(line2)
    expect(dialog.getElements().length).toBe(2)
  })
})

describe('6.3 Propiedad speaker', () => {
  test('Se crea la propiedad speaker', () => {
    const dialog = new DialogueBlock('Heroe')
    expect(dialog.speaker).toBe('Heroe')

    const dialog2 = new DialogueBlock('Villano')
    expect(dialog2.speaker).toBe('Villano')
  })

  test('Si al crear, no se pasa el parámetro, speaker estará vacío', () => {
    const dialog = new DialogueBlock()
    expect(dialog.speaker).toBe('')
  })
})

describe('6.4 Método render sin speaker', () => {
  test('Si speaker está vacío, se imprime en línea separados por coma', () => {
    const dialog = new DialogueBlock() // Sin speaker
    const line1 = new Narrative('Viento soplando')
    const line2 = new Narrative('Madera crujiendo')
    const line3 = new Narrative('Gritos lejanos')
    
    dialog.addElements(line1, line2, line3)
    
    // Formato lista horizontal terminada en salto de línea
    expect(dialog.render()).toBe('Viento soplando\nMadera crujiendo\nGritos lejanos\n')
  })

  test('Funciona si se cambia el Adventure.eol', () => {
    Adventure.eol = '<br>'
    const dialog = new DialogueBlock()
    const line1 = new Narrative('A')
    const line2 = new Narrative('B')
    
    dialog.addElements(line1, line2)
    
    expect(dialog.render()).toBe('A<br>B<br>')
  })
})

describe('6.5 Método render con speaker', () => {
  test('Si speaker tiene un nombre se imprime cada texto en una linea con el nombre delante (y : )', () => {
    const dialog = new DialogueBlock('Heroe')
    const line1 = new Narrative('¿Hay alguien ahí?')
    const line2 = new Narrative('Tengo miedo.')
    
    dialog.addElements(line1, line2)
    
    // Heroe: Texto\nHeroe: Texto\n
    expect(dialog.render()).toBe('Heroe: ¿Hay alguien ahí?\nHeroe: Tengo miedo.\n')
  })

  test('Igual que el anterior pero con otro speaker', () => {
    const dialog = new DialogueBlock('Oráculo')
    const line1 = new Narrative('El destino...')
    const line2 = new Narrative('...es inmutable.')
    
    dialog.addElements(line1, line2)
    
    expect(dialog.render()).toBe('Oráculo: El destino...\nOráculo: ...es inmutable.\n')
  })
})

describe('6.6 Método render con speaker y cambio de eol', () => {
  test('Cambiando el Adventure.eol también funciona', () => {
    Adventure.eol = '<br>'
    const dialog = new DialogueBlock('NPC')
    const line1 = new Narrative('Bienvenido')
    const line2 = new Narrative('Pase')
    
    dialog.addElements(line1, line2)
    
    expect(dialog.render()).toBe('NPC: Bienvenido<br>NPC: Pase<br>')
  })
})

