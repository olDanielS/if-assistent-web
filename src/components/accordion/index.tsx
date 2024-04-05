import React from 'react';
import './accordion.css'

import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

const faqs = [
    { key: 1, title: 'Teste', content: "Esse é meu primeiro faq" },
    { key: 2, title: 'Teste', content: "Esse é meu segundo faq" },
]


export default function FaqsAccordion({data}) {
    
    return (    
        <div>
            <Accordion>
            {
                data.map((item, index) => {
                    return (
                        <AccordionItem key={index}>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    {item.title}
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <p>
                                    {item.content}
                                </p>
                            </AccordionItemPanel>
                        </AccordionItem>
                    );
                })
            }
        </Accordion>

        </div>
    );
}