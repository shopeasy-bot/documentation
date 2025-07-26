import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';
import icons from './icons';
import { createElement } from 'react';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),  
  
  icon(key) {
    if (key && key in icons){
      return createElement(icons[key]);
    }
  },

});
