import { describe, it, expect } from 'vitest'

describe('Vitest setup', () => {
    it('vitest should work correct', ()=>{
        expect(1 + 1).toBe(2)
    })

    it('should check strings', ()=>{
        expect('Nextjs').toBe('Nextjs')
    })
 })