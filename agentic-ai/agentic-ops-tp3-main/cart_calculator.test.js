const { calculateTotal } = require('./src/cart_calculator');

describe('calculateTotal', () => {
    test('should_return_zero_when_items_is_empty_array', () => {
        // Arrange
        const items = [];

        // Act
        const result = calculateTotal(items);

        // Assert
        expect(result).toBe(0);
    });

    test('should_return_zero_when_items_is_not_an_array', () => {
        // Arrange
        const items = null;

        // Act
        const result = calculateTotal(items);

        // Assert
        expect(result).toBe(0);
    });

    test('should_return_zero_when_items_is_undefined', () => {
        // Arrange
        const items = undefined;

        // Act
        const result = calculateTotal(items);

        // Assert
        expect(result).toBe(0);
    });

    test('should_apply_default_tax_rate_when_tax_rate_is_not_provided', () => {
        // Arrange
        const items = [{ price: 10, quantity: 1 }];

        // Act
        const result = calculateTotal(items);

        // Assert
        expect(result).toBe(12);
    });

    test('should_apply_no_discount_when_discount_is_not_provided', () => {
        // Arrange
        const items = [{ price: 100, quantity: 1 }];

        // Act
        const result = calculateTotal(items, 0);

        // Assert
        expect(result).toBe(100);
    });

    test('should_sum_multiple_items_when_cart_has_several_lines', () => {
        // Arrange
        const items = [
            { price: 10, quantity: 2 },
            { price: 5, quantity: 3 },
        ];

        // Act
        const result = calculateTotal(items, 0);

        // Assert
        expect(result).toBe(35);
    });

    test('should_default_quantity_to_one_when_quantity_is_missing', () => {
        // Arrange
        const items = [{ price: 10 }];

        // Act
        const result = calculateTotal(items, 0);

        // Assert
        expect(result).toBe(10);
    });

    test('should_treat_price_as_zero_when_price_is_missing', () => {
        // Arrange
        const items = [{ quantity: 5 }];

        // Act
        const result = calculateTotal(items, 0);

        // Assert
        expect(result).toBe(0);
    });

    test('should_clamp_negative_price_to_zero_when_price_is_negative', () => {
        // Arrange
        const items = [{ price: -50, quantity: 1 }];

        // Act
        const result = calculateTotal(items, 0);

        // Assert
        expect(result).toBe(0);
    });

    test('should_clamp_negative_quantity_to_zero_when_quantity_is_negative', () => {
        // Arrange
        const items = [{ price: 10, quantity: -3 }];

        // Act
        const result = calculateTotal(items, 0);

        // Assert
        expect(result).toBe(0);
    });

    test('should_treat_zero_quantity_as_one_when_quantity_is_explicitly_zero', () => {
        // Arrange
        // Comportement legacy documenté dans MEMORY.md : `item.quantity || 1`
        // traite 0 comme falsy, donc une quantité de 0 est comptée comme 1.
        const items = [{ price: 10, quantity: 0 }];

        // Act
        const result = calculateTotal(items, 0);

        // Assert
        expect(result).toBe(10);
    });

    test('should_apply_custom_tax_rate_when_tax_rate_is_provided', () => {
        // Arrange
        const items = [{ price: 100, quantity: 1 }];

        // Act
        const result = calculateTotal(items, 0.10);

        // Assert
        expect(result).toBe(110);
    });

    test('should_apply_discount_before_tax_when_discount_is_provided', () => {
        // Arrange
        const items = [{ price: 100, quantity: 1 }];

        // Act
        const result = calculateTotal(items, 0.20, 20);

        // Assert
        expect(result).toBe(96);
    });

    test('should_clamp_subtotal_to_zero_when_discount_exceeds_subtotal', () => {
        // Arrange
        const items = [{ price: 10, quantity: 1 }];

        // Act
        const result = calculateTotal(items, 0.20, 1000);

        // Assert
        expect(result).toBe(0);
    });

    test('should_round_result_to_two_decimals_when_computation_yields_more_precision', () => {
        // Arrange
        const items = [{ price: 10.005, quantity: 3 }];

        // Act
        const result = calculateTotal(items, 0);

        // Assert
        expect(result).toBe(30.02);
    });

    test('should_return_subtotal_unchanged_when_tax_rate_is_zero_and_no_discount', () => {
        // Arrange
        const items = [{ price: 42, quantity: 2 }];

        // Act
        const result = calculateTotal(items, 0, 0);

        // Assert
        expect(result).toBe(84);
    });
});
