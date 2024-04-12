export const MAIN_TRANSACTIONS_HEADERS = [
    {title: 'id', value: 'id'},
    {title: 'amount', value: 'amount'},
    {title: 'user', value: 'user'},
    {title: 'type', value: 'type'},
    {title: 'status', value: 'status'},
    {title: 'created_at', value: 'created_at'},
]

export const MAIN_BONUSES_HEADERS = [
    {title: 'name', align: 'start', sortable: false, key: 'name'},
    {title: 'fs', align: 'center', sortable: false, key: 'free_spins'},
    {title: 'fs_bet', align: 'center', sortable: false, key: 'free_spins_bet'},
    {title: 'image', key: 'image', align: 'center'},
    {title: 'type', key: 'no_deposit', align: 'center'},
    {title: 'created_at', key: 'created_at', align: 'center'},
    {title: 'updated_at', key: 'updated_at', align: 'center'},
]

export const TRANSACTIONS_HEADERS = [
    {title: 'id', value: 'id'},
    {title: 'amount', value: 'amount'},
    {title: 'type', value: 'type'},
    {title: 'status', value: 'status'},
    {title: 'creator', value: 'creator'},
    {title: 'created_at', value: 'created_at'},
]

export const NOTIFICATIONS_HEADERS = [
    {title: 'type', value: 'type'},
    {title: 'message', value: 'data'},
    {title: 'read_at', value: 'read_at'},
    {title: 'created_at', value: 'created_at'},
]

export const USER_BONUSES_HEADERS = [
    {title: 'name', value: 'name'},
    {title: 'status', value: 'status'},
    {title: 'source_type', value: 'source_type'},
    {title: 'deadline', value: 'deadline'},
    {title: 'created_at', value: 'created_at'},
]

export const USER_GIFT_BOXES_HEADERS = [
    {title: 'gift_box_name', value: 'gift_box_name'},
    {title: 'status', value: 'status'},
    {title: 'deadline', value: 'deadline'},
    {title: 'created_at', value: 'created_at'},
]

export const TOURNAMENTS_HEADERS = [
    {title: 'tournament', value: 'tournament'},
    {title: 'earned', value: 'earned'},
    {title: 'created_at', value: 'created_at'},
    {title: 'updated_at', value: 'updated_at'},
];