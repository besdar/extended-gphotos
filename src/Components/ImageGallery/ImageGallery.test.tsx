import { mount } from 'enzyme';
import React from 'react';
import ImageGallery from './ImageGallery';
import { act } from 'react-dom/test-utils';

it('Should normal first render with normal props values', async () => {
    jest.useFakeTimers();

    let component;
    await act(async () => {
        component = mount(
            <ImageGallery
                galleryStructureConfig={{
                    columnsCount: 3,
                    rowsCount: 3,
                    maxSquareSizeInColumns: 2
                }}
                getRandomImage={() => ({
                    imageUrl: 'imageUrl',
                    tooltipTitle: 'tooltipTitle',
                    webUrl: 'webUrl',
                })}
            />
        );

        jest.runOnlyPendingTimers();
    });

    expect(component).toMatchSnapshot();
});

it('Should normal render with first useEffect with normal props values', async () => {
    jest.useFakeTimers();

    let component;
    await act(async () => {
        component = mount(
            <ImageGallery
                galleryStructureConfig={{
                    columnsCount: 3,
                    rowsCount: 3,
                    maxSquareSizeInColumns: 2
                }}
                getRandomImage={() => ({
                    imageUrl: 'imageUrl',
                    tooltipTitle: 'tooltipTitle',
                    webUrl: 'webUrl',
                })}
            />
        );

        jest.runOnlyPendingTimers();
        jest.runOnlyPendingTimers();
    });

    expect(component).toMatchSnapshot();
});

it('Should normal render with useEffect update with normal props values', async () => {
    jest.useFakeTimers();

    let component;
    await act(async () => {
        component = mount(
            <ImageGallery
                galleryStructureConfig={{
                    columnsCount: 3,
                    rowsCount: 3,
                    maxSquareSizeInColumns: 2
                }}
                getRandomImage={() => ({
                    imageUrl: 'imageUrl',
                    tooltipTitle: 'tooltipTitle',
                    webUrl: 'webUrl',
                })}
            />
        );

        jest.runOnlyPendingTimers();
        jest.runOnlyPendingTimers();
        jest.runOnlyPendingTimers();
    });

    expect(component).toMatchSnapshot();
});

it('Should not rerender render with useEffect update with wrong props values', async () => {
    jest.useFakeTimers();

    let component;
    await act(async () => {
        component = mount(
            <ImageGallery
                galleryStructureConfig={{
                    columnsCount: 3,
                    rowsCount: 3,
                    maxSquareSizeInColumns: 2
                }}
                getRandomImage={() => ({
                    imageUrl: 'imageUrl',
                    tooltipTitle: 'tooltipTitle',
                    webUrl: 'webUrl',
                })}
                simultaneouslyImageChanging={0}
            />
        );

        jest.runOnlyPendingTimers();
        jest.runOnlyPendingTimers();
    });

    expect(component).toMatchSnapshot();
});