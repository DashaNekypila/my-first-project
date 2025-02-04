import React from "react";
import {create} from 'react-test-renderer';
import ProfileStatus from "./ProfileStatus";
import { createRoot } from "react-dom/client";

describe('ProfileStatus component', () => {
    test('status from props should be in the state', () => {
        const component = createRoot(<ProfileStatus status='it-kamasutra.com'/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('it-kamasutra.com');
    });
    test('after creation <span> should be displayed', () => {
        const component = createRoot(<ProfileStatus status='it-kamasutra.com'/>);
        const root = component.root;
        let span = root.findByType('span');
        expect(span).not.toBeNull();
    });
    test('after creation <input> should not be displayed', () => {
        const component = createRoot(<ProfileStatus status='it-kamasutra.com'/>);
        const root = component.root;
        
        expect(() => {
            let input = root.findByType('input');
        }).toThrow();
    });
    test('after creation <span> should contains correct status', () => {
        const component = createRoot(<ProfileStatus status='it-kamasutra.com'/>);
        const root = component.root;
        let span = root.findByType('span');
        expect(span.children[0]).toBe('it-kamasutra.com');
    });
    test('input should be displayed in editMode instead of span ', () => {
        const component = createRoot(<ProfileStatus status='it-kamasutra.com'/>);
        const root = component.root;
        let span = root.findByType('span');
        span.props.onDoubleClick();
        let input = root.findByType('input');
        expect(input.props.value).toBe('it-kamasutra.com');
    });
    test('callback should be called', () => {
        const mockCallback = jest.fn();
        const component = createRoot(<ProfileStatus status='it-kamasutra.com' updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});