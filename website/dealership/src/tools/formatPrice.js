export function formatPrice(number) {
    return new Intl.NumberFormat('cs-CZ', {style: 'currency', currency: 'CZK'}).format(number);
}