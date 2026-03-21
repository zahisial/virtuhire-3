// Button.test.js
test('button renders and clicks', () => {
    render(<Button label="Submit" />);
    const btn = screen.getByText('Submit');
    fireEvent.click(btn);
    expect(mockFn).toHaveBeenCalled();
  });