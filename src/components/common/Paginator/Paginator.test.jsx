import React from "react";
import { createRoot } from "react-dom/client";
import Paginator from "./Paginator";
describe ('Paginator component test', () => {
    test('pages count is 11 but should be showed only 10', () => {
        const component = createRoot(<Paginator totalItemsCount={11} pageSize={1} portionSize={10}/>);
        const root = component.root;
        let spans = root.findByType('span');
        expect(spans.length).toBe(10);
    });
    test('if pages count is more then 10 button NEXT should be present', () => {
        const component = createRoot(<Paginator totalItemsCount={11} pageSize={1} portionSize={10}/>);
        const root = component.root;
        let button = root.findByType('button');
        expect(button.length).toBe(1);
    });
})