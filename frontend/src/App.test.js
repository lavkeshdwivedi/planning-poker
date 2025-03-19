import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// Mock socket.io client to prevent real WebSocket connections
jest.mock("socket.io-client", () => {
  return () => ({
    emit: jest.fn(),
    on: jest.fn(),
    disconnect: jest.fn(),
  });
});

describe("Planning Poker App", () => {
  test("renders the Planning Poker app", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByText(/Planning-Poker by Lavkesh Dwivedi/i)).toBeInTheDocument();
  });

  test("allows Scrum Master to create a room", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const createRoomButton = screen.getByText(/Create New Room/i);
    fireEvent.click(createRoomButton);

    expect(screen.getByText(/Share this link with members/i)).toBeInTheDocument();
  });

  test("allows users to enter their name and join a room", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const nameInput = screen.getByPlaceholderText("Enter Name");
    fireEvent.change(nameInput, { target: { value: "John Doe" } });

    const joinButton = screen.getByText(/Join Room/i);
    fireEvent.click(joinButton);

    expect(localStorage.getItem("username")).toBe("John Doe");
  });

  test("persists username across refreshes", () => {
    localStorage.setItem("username", "Jane Doe");

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    expect(screen.getByDisplayValue("Jane Doe")).toBeInTheDocument();
  });

  test("disables join button when no name is entered", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const joinButton = screen.getByText(/Join Room/i);
    expect(joinButton).toBeDisabled();
  });
});