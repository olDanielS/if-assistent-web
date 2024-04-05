import React, {useEffect, useState} from 'react';

import './faqs.css';
import { FiMessageSquare, FiPlus } from 'react-icons/fi'

import { Link } from 'react-router-dom';

import Heaeder from '../../components/Header';
import Title from '../../components/Title';

import FaqsAccordion from '../../components/accordion';

import { collection, getDocs, orderBy, limit, startAfter, query } from 'firebase/firestore';
import { db } from "../../services/firebaseConnect";

const listRef = collection(db, "faqs");

interface DocumentData {
    id: string,
    title: string,
    content: string
}

export default function Faqs() {

    const [faqs, setFaqs] = useState<DocumentData[]>([]);

    useEffect(() => {
        async function loadFaqs() {
            const consult = query(listRef, limit(10));

            const consultSnapshot = await getDocs(consult);
            setFaqs([])
        
            updateState(consultSnapshot)
        }

        loadFaqs();

        return () => { }
    },
        [])

    
        async function updateState(consultSnapshot) {
           
                let list: DocumentData[] = [];
    
                consultSnapshot.forEach((doc) => {
                    const data = doc.data() as DocumentData;
                  
                    list.push({
                        id: doc.id,
                       title: data.title,
                       content: data.content
    
                    });
                });
                //console.log(list)
                setFaqs(faq => [...faq, ...list]);
  
        }

    return (
        <div>
            <Heaeder />

            <div className="content">
                <Title name="Faqs">
                    <FiMessageSquare size={24} />
                </Title>

                    <Link to="/newfaq" className="newCall">
                        <FiPlus size={24} />
                        Nova FAQ
                    </Link>
               
                <div className="container-accordion">
                    <FaqsAccordion data={faqs}/>
                </div>
            </div>
        </div>
    );
}