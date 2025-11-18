/* eslint-env jest */

const Adventure = require('../src/adventure')


beforeEach(() => {
  // Reseteamos el salto de línea estático antes de cada test
  // para evitar que un test afecte a otros.
  Adventure.eol = '\n'
})

describe('2.1 Clase Adventure', () => {
  test('Se ha creado la clase Adventure', () => {
    expect(() => new Adventure()).not.toThrow()
  })
})

describe('2.2 Propiedades:', () => {
  test('Propiedad título (title) sin más parámetros', () => {
    const quest = new Adventure('La Búsqueda del Tesoro')
    expect(quest.title).toBe('La Búsqueda del Tesoro')
  })

  test('Se crea con un titulo y GM (gm es oculto)', () => {
    const quest = new Adventure('La Búsqueda del Tesoro', 'Dungeon Master')
    expect(quest.title).toBe('La Búsqueda del Tesoro')
    // Verificamos que solo 'title' es visible directamente como propiedad enumerable
    // si se imprimiera el objeto (gm debe estar oculto/privado o en símbolo)
    expect(quest).toEqual({ title: 'La Búsqueda del Tesoro' })
  })
})

describe('2.3 Propiedad calculada gm (Game Master):', () => {
  test('Existe la propiedad calculada gm', () => {
    const quest = new Adventure('La Búsqueda del Tesoro', 'Merlin')
    expect(quest.gm).toBe('Merlin')
  })

  test('Si al crear la aventura no se pasa el GM, se pone "IA"', () => {
    const quest = new Adventure('Aventura Espacial')
    expect(quest.gm).toBe('IA')
  })
})

describe('2.4 Modificar gm:', () => {
  test('Se puede modificar la propiedad "gm" como una propiedad más.', () => {
    const quest = new Adventure('La Búsqueda', 'Merlin')
    expect(quest.gm).toBe('Merlin')
    quest.gm = 'Gandalf'
    expect(quest.gm).toBe('Gandalf')
  })

  test('Si se intenta modificar el GM, éste debe tener más de 3 caracteres o no se modifica', () => {
    const quest = new Adventure('La Búsqueda', 'Merlin')
    expect(quest.gm).toBe('Merlin')
    quest.gm = 'Yo' // Muy corto
    expect(quest.gm).toBe('Merlin')
  })

  test('Si se intenta modificar el GM, se eliminan los espacios por delante o detrás', () => {
    const quest = new Adventure('La Búsqueda', 'Merlin')
    expect(quest.gm).toBe('Merlin')
    quest.gm = '    Gandalf    ' // Tiene espacios
    expect(quest.gm).toBe('Gandalf')
  })

  test('Si al intentar modificar el GM el nuevo texto tiene menos de 3 caracteres cuando se le quitan los espacios, no se modifica.', () => {
  const quest = new Adventure('La Búsqueda', 'Merlin')
    expect(quest.gm).toBe('Merlin')
    quest.gm = '    Po    ' // Tiene espacios
    expect(quest.gm).toBe('Merlin')
  })
})

describe('2.5 Propiedad estática eol (End of Line):', () => {
  test('La propiedad eol no es una propiedad de instancia', () => {
    const quest = new Adventure('La Búsqueda', 'Merlin')
    expect(quest.eol).toBeUndefined()
  })

  test('La propiedad eol es una propiedad de clase', () => {
    expect(Adventure.eol).toBe('\n')
  })

  test('Se puede cambiar eol a "<br>"', () => {
    expect(Adventure.eol).toBe('\n')
    Adventure.eol = '<br>'
    expect(Adventure.eol).toBe('<br>')
  })
})

describe('2.6 Método render:', () => {
  test('Existe el método render', () => {
    const quest = new Adventure('La Búsqueda', 'Merlin')
    expect(quest.render).toBeDefined()
  })

  test('Al renderizar la aventura se verán las líneas: Aventura, Master con sus saltos de línea', () => {
    const quest = new Adventure('La Cueva Oscura', 'El Narrador')
    
    const txtExpected = `Aventura: La Cueva Oscura
Master: El Narrador
`;
    expect(quest.render()).toEqual(txtExpected)
  })

  test('El render respeta el cambio de eol', () => {
    Adventure.eol = '<br>'
    const quest = new Adventure('La Cueva Oscura', 'El Narrador')
    
    // Nota: Observa que los saltos de línea internos ahora son <br>
    const txtExpected = `Aventura: La Cueva Oscura<br>Master: El Narrador<br>`
    expect(quest.render()).toEqual(txtExpected)
  })
})