import { StyleOption, Review, FAQ, Order } from './types';

export const STYLE_OPTIONS: StyleOption[] = [
  {
    id: 'round',
    name: 'Round',
    vietnameseName: 'Dáng Tròn (Tự nhiên)',
    tagline: 'Ôm khít tinh tế, mỏng nhẹ tối đa',
    description: 'Bề mặt trơn mịn tuyệt đối, độ vát viền siêu mỏng chỉ 0.1mm giúp ôm khít bầu ngực tự nhiên nhất. Hoàn hảo khi mặc áo thun ôm sát, áo lụa bóng mềm mại hoặc váy tôn dáng.',
    pros: [
      'Viền siêu vát mỏng tàng hình 100%',
      'Cảm giác nhẹ tênh như làn da thứ hai',
      'Thích hợp cho mọi phom ngực khác nhau'
    ]
  },
  {
    id: 'blossom',
    name: 'Blossom',
    vietnameseName: 'Dáng Hoa Mai (Điệu đà)',
    tagline: 'Đường điệu đà ôm khít bầu ngực, bo góc an toàn',
    description: 'Họa tiết tạo phom cánh hoa giúp giải phóng lực căng bám dính đồng đều tại mép dán, ngăn chặn bong và quăn viền ngay cả khi vận động nhảy múa cường độ cao hoặc bơi lội dưới nước.',
    pros: [
      'Cánh hoa bo góc chống quăn mép tuyệt đối',
      'Diện mạo xinh xắn, nữ tính điệu đà',
      'Đặc biệt khuyên dùng khi vận động thể thao'
    ]
  }
];

export const REVIEWS_LIST: Review[] = [
  {
    id: 'rev-1',
    author: 'Trần Minh Thư',
    role: 'Quý cô công sở',
    rating: 5,
    content: 'Mình cực kỳ kén dán ngực vì da nhạy cảm dễ mẩn đỏ, nhưng dòng Hoa Thiên Nhi quả thực đỉnh thật sự. Dùng thử đi làm cả ngày ngồi phòng lạnh rồi chạy ngoài trời nắng mồ hôi đầm đìa mà không hề bị ngứa hay hở mép dán. Viền mỏng dính vào ngực tàng hình thật luôn, mặc sơ mi lụa trắng tẹt ga!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    productStyle: 'Dáng Tròn (Tự nhiên)',
    date: '10/06/2026'
  },
  {
    id: 'rev-2',
    author: 'Phan Vy Anh',
    role: 'Mẹ bỉm sữa',
    rating: 5,
    content: 'Từ lúc sinh bé xong đầu ti bị thâm nhẹ và nhạy cảm cực kỳ, may mà tìm được miếng dán silicone của shop. Lớp gel ở giữa trừa phần nhũ hoa ra nên không đau tí nào khi lột hết. Điểm cộng cực lớn là hộp đựng xinh xắn, sạch sẽ. Mình đã rửa lại bằng xà phòng trung tính 15 lần rồi mà bám vẫn rất chắc như mới!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    productStyle: 'Dáng Hoa Mai (Điệu đà)',
    date: '12/06/2026'
  },
  {
    id: 'rev-3',
    author: 'Nguyễn Thảo Nhi',
    role: 'Người mẫu ảnh',
    rating: 5,
    content: 'Chụp hình studio hay mặc đồ lụa thiết kế mỏng như sương mà lộ đầu ti là hỏng cả concept. Bộ Hoa Thiên Nhi cứu tinh rực rỡ của mình, dán vào một cái là phẳng lì mịn màng từ mọi góc độ camera. Giá 299k được hẳn 5 hộp 20 miếng dùng nửa năm không hết. Quyết định mua combo 5 hộp là quá hời.',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80',
    productStyle: 'Dáng Tròn (Tự nhiên)',
    date: '13/06/2026'
  }
];

export const FAQ_LIST: FAQ[] = [
  {
    id: 'faq-1',
    category: 'Vận chuyển',
    question: 'Giao hàng có bảo mật thông tin sản phẩm nhạy cảm không?',
    answer: 'Dạ TRUYỆT ĐỐI BẢO MẬT ạ! Hoa Thiên Nhi cam kết đóng gói toàn bộ kiện từ hộp carton trung tính cao cấp, KHÔNG bao giờ ghi tên sản phẩm nhạy cảm hay dán nhãn gợi ý bên ngoài hộp. Nhãn đơn hàng dán ngoài bọc chỉ ghi ngắn gọn: "Phụ kiện trang phục" nhằm bảo vệ tối đa tính riêng tư của nàng thương.'
  },
  {
    id: 'faq-2',
    category: 'Độ bám dính',
    question: 'Đi bơi, tập yoga ra nhiều mồ hôi có bị tuột không?',
    answer: 'Với công nghệ Gel keo sinh học liên kết y tế, miếng dán bám siêu dính tự nhiên nhờ độ hít nhiệt tự thân cơ thể. Nàng có sũng nước đi bơi biển, giặt xà phòng lướt sóng hoặc chạy bộ mồ hôi dầm dề thì mép dán vẫn dính khít khìn khịt mà không sợ bong rớt.'
  },
  {
    id: 'faq-3',
    category: 'Sử dụng',
    question: 'Miếng dán thực sự tái sử dụng được bao nhiêu lần?',
    answer: 'Trung bình nếu nàng vệ sinh đều đặn sau lần dùng bằng nước ấm sạch hoặc nước rửa dán ti chuyên dụng, úp vào khay silicon phơi gió khô tự nhiên, miếng dán của Hoa Thiên Nhi có độ bền tái bám dính dẻo dai từ 30 đến 50 lần.'
  },
  {
    id: 'faq-4',
    category: 'Độ mỏng',
    question: 'Viền mỏng 0.1mm thì độ che quầng thế nào?',
    answer: 'Thiết kế đột phá vát mỏng viền ngoài cùng xuống 0.1mm để giảm nốt cộm hằn trang phục, nhưng phần tâm cốt miếng dán vẫn có độ dày 1.5mm - 2mm đảm bảo phủ mờ che kín 100% quầng thâm hay đầu ti nhô ra cực tốt nhen nàng.'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'HTN-8201',
    customerName: 'Hoàng Thị Thùy Linh',
    phoneNumber: '0987342615',
    address: '152/4 Điện Biên Phủ, Phường 15, Quận Bình Thạnh, TP. Hồ Chí Minh',
    productCombo: 'Combo Ngọc Nữ - 5 Hộp D dán ngực (Hot Sale 45%)',
    stylePreference: 'round',
    note: 'Giao giờ hành chính, bọc kỹ hộp và không in tên sản phẩm giùm mình nha',
    price: 299000,
    orderDate: '2026-06-13T08:15:22.000Z',
    status: 'Pending',
    isTrash: false,
    paymentMethod: 'COD'
  },
  {
    id: 'HTN-8202',
    customerName: 'Lê Thu Phương',
    phoneNumber: '0912445889',
    address: 'Chung cư Golden Land, 275 Nguyễn Trãi, Quận Thanh Xuân, Hà Nội',
    productCombo: 'Combo Ngọc Nữ - 5 Hộp D dán ngực (Hot Sale 45%)',
    stylePreference: 'blossom',
    note: 'Vui lòng gọi trước khi giao 30 phút. Cảm ơn shop nhiều.',
    price: 299000,
    orderDate: '2026-06-13T09:20:11.000Z',
    status: 'Shipping',
    isTrash: false,
    paymentMethod: 'BANK_TRANSFER'
  },
  {
    id: 'HTN-8203',
    customerName: 'Nguyễn Thị Ngọc Ánh',
    phoneNumber: '0375992811',
    address: '45 Lê Duẩn, Phường Thạch Thang, Quận Hải Châu, Đà Nẵng',
    productCombo: 'Combo Ngọc Nữ - 5 Hộp D dán ngực (Hot Sale 45%)',
    stylePreference: 'round',
    note: 'Đóng gói bọc đen kín đáo, giao giờ chiều sau 5h',
    price: 299000,
    orderDate: '2026-06-12T14:45:00.000Z',
    status: 'Completed',
    isTrash: false,
    paymentMethod: 'COD'
  },
  {
    id: 'HTN-8204',
    customerName: 'Trần Khánh Huyền',
    phoneNumber: '0388277364',
    address: 'Số hẻm 12 Thống Nhất, Phường Mỹ Long, Long Xuyên, An Giang',
    productCombo: 'Combo Ngọc Nữ - 5 Hộp D dán ngực (Hot Sale 45%)',
    stylePreference: 'blossom',
    note: 'Muốn đổi 3 hộp dáng tròn 2 hộp dáng hoa mai được không shop ơi?',
    price: 299000,
    orderDate: '2026-06-11T11:05:14.000Z',
    status: 'Cancelled',
    isTrash: false,
    paymentMethod: 'MOMO'
  }
];

export const SOCIAL_PROOF_POOL = [
  { name: 'Chị Minh Thư', location: 'Quận 3, TP.HCM', action: 'vừa đặt mua thành công Combo 5 hộp Hoa Thiên Nhi' },
  { name: 'Nàng Vy Anh', location: 'Hoàn Kiếm, Hà Nội', action: 'vừa chốt đơn Combo 5 Hộp dáng Hoa Mai điệu đà' },
  { name: 'Bạn Thảo Vy', location: 'Q. Hải Châu, Đà Nẵng', action: 'vừa sắm Combo 5 Hộp dáng Tròn tàng hình' },
  { name: 'Chị Huỳnh Như', location: 'Ninh Kiều, Cần Thơ', action: 'vừa đặt 1 suất Combo 299k tặng kèm bộ cọ vệ sinh' },
  { name: 'Chị Mai Lan', location: 'Tp. Thủ Dầu Một, Bình Dương', action: 'vừa mua Combo 5 hộp Hoa Thiên Nhi che khuyết điểm' },
  { name: 'Chị Phượng Lê', location: 'Quận Tây Hồ, Hà Nội', action: 'vừa chọn Combo Tròn mát mẻ cho mùa hè' },
  { name: 'Chị Ngọc Trinh', location: 'Tp. Vũng Tàu', action: 'vừa đặt hàng thành công bảo mật bọc kiện kín đáo cách đây 2 phút' },
  { name: 'Nàng Quỳnh Chi', location: 'Quận Phú Nhuận, TP.HCM', action: 'vừa mua Combo 5 hộp silicone y tế' }
];
