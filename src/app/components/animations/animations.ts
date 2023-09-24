import { animation, trigger, style, transition, animate, useAnimation } from '@angular/animations';

export const fadeInAnimation = animation([
  style({
    opacity: '{{ opacity }}'
  }),
  animate('{{ time }}')
])

export const fadeIn = trigger('fadeIn', [
  transition('visible => invisible', [
    useAnimation(fadeInAnimation, {
      params: {
        opacity: 0,
        time: '5s',
      }
    })
  ])
])