'use client'
import { IconButton } from '@/components/IconButton'
import { Input } from '@/components/ui/input'
import { ArrowLeft, ArrowRight, RotateCcw, Trash } from 'lucide-react'
import { FormEvent, useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'

export const Initiative: React.FC = () => {
  const [newCharacter, setNewCharacter] = useState('')
  const [characters, setCharacters] = useState<{ name: string, id: string }[]>([])
  const [selected, setSelected] = useState<number>(0)
  const [turn, setTurn] = useState<number>(1)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setCharacters([...characters, { name: newCharacter, id: new Date().toISOString() }])
    setNewCharacter('')
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const items = Array.from(characters)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setCharacters(items)
  }

  const deleteCharacter = (id: string) =>
    setCharacters([...characters.filter((character) => character.id !== id)])

  return (
    <main className='relative flex justify-center gap-2 py-8 px-2 font-title text-2xl'>
      <div>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-center justify-center gap-2'
        >
          <h1>Turno {turn}</h1>
          <Input
            className='mb-5'
            name='characterName'
            autoComplete='off'
            placeholder='Nome do personagem'
            onChange={(event) => setNewCharacter(event.target.value)}
            value={newCharacter}
          />
          <div className='mb-8 flex gap-4'>
            <IconButton
              ariaLabel='Reiniciar iniciativa'
              className='rounded bg-red-700 p-3 transition-colors hover:bg-red-600'
              type='button'
              onClick={() => {
                setSelected(0)
                setTurn(1)
              }}
            >
              <RotateCcw />
            </IconButton>
            <IconButton
              ariaLabel='Voltar'
              className='rounded bg-slate-700 p-3 transition-colors hover:bg-yellow-600'
              type='button'
              onClick={() => {
                if (characters.length <= 0) return
                if (turn - 1 <= 0 && selected === 0) return

                if (selected > 0) {
                  setSelected(selected - 1)
                } else {
                  setSelected(characters.length - 1)
                  setTurn(turn - 1)
                }
              }}
            >
              <ArrowLeft />
            </IconButton>
            <IconButton
              ariaLabel='Proximo'
              className='rounded bg-slate-700 p-3 transition-colors hover:bg-green-600'
              type='button'
              onClick={() => {
                if (characters.length <= 0) return

                if (selected < characters.length - 1) {
                  setSelected(selected + 1)
                } else {
                  setSelected(0)
                  setTurn(turn + 1)
                }
              }}
            >
              <ArrowRight />
            </IconButton>
          </div>
        </form>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='characters'>
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='flex flex-col gap-2 max-h-[400px] overflow-auto'
              >
                {characters.length > 0 ? characters.map(({ name, id }, index) => (
                  <Draggable
                    draggableId={name}
                    key={name}
                    index={index}
                  >
                    {(provided2) => (
                      <li
                        ref={provided2.innerRef}
                        {...provided2.draggableProps}
                        {...provided2.dragHandleProps}
                        onClick={() => setSelected(index)}
                        className={`flex cursor-pointer items-center justify-between gap-4 rounded-md p-4 leading-4 transition-colors hover:bg-gray-900 ${
                          selected === index ? 'bg-slate-800' : ''
                        }`}
                      >
                        <p className='capitalize'>{name}</p>
                        <IconButton
                          ariaLabel='Deletar personagem'
                          onClick={() => deleteCharacter(id)}
                        >
                          <Trash className='text-red-600' />
                        </IconButton>
                      </li>
                    )}
                  </Draggable>
                )) : (
                  <p className='text-center text-sm text-gray-600'>Nenhuma iniciativa</p>
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </main>
  )
}
