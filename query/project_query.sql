use secondhand;

# ================= User =================
# 사용자 관련 Query

# 회원가입
insert into user(u_email, u_pw, u_name, u_phone) values ("ksh@naver.com", "1234", "김상호", "01012345678");

# 회원정보 수정
update user 
set u_pw = "2345"
where u_email = "ksh@naver.com" and u_name = "김상호" and u_phone = "01012345678";

# 회원탈퇴
delete  
from user
where u_email = "ksh@naver.com" and u_pw = "2345";

# 사용자 정지 - 사용자의 이메일과 동일한 아이디를 가진 사용자를 정지함
update user
set u_report = 1
where u_email = "";

# 사용자 조회 - 이메일, 이름, 휴대폰, 가입날짜, 상품판매횟수
select u.u_email, u.u_name, u.u_phone, u.u_sign_date, count(*) sell_count
from user u join product p on u.u_id = p.User_u_id
where u.u_id = 1;

# 로그인 - 로그인 정보(이메일, 비밀번호)와 맞는 데이터의 개수를 반환
select *
from user u
where u.u_email = "" and u_pw = "";

# ================= Report =================
# 신고 관련 Query

# 유저 신고 - 사용자쪽에서 제품의 신고 버튼을 눌렀을 때 
insert into report(r_title, r_contents, User_u_id, Product_p_id)
values ("허위매물", "이 제품은 한국에서 판매 안하는 짝퉁입니다.", 1, 1);

# 신고처리 리스트
# u_p ==> 신고당한 제품과 그 제품을 등록한 사용자(신고당한 사용자)의 정보를 담은 테이블
# report와 u_p를 join하여 신고당한 제품의 사용자 정보를 얻음
select reporting_u.u_email, reported_u.u_email, reported_u.r_title
from (select u.u_email, u.u_id
	  from user u join report r 
      on u.u_id = r.User_u_id) reporting_u join (
	  select u_p.u_email, r.*
	  from report r join (select u.u_email, u.u_id, p.p_id
						from user u join product p on u.u_id = p.User_u_id) u_p
	  on r.Product_p_id = u_p.p_id
      ) reported_u
on reporting_u.u_id = reported_u.User_u_id;

# 신고처리 상세보기
select u.u_email, r.r_title, r.r_contents
from user u join report r on u.u_id = r.User_u_id
where r.r_id = 1;


# ================= Product Inquiry =================
# 상품 문의 관련 Query

# 상품 문의 댓글 조회
select u_pi.u_name, u_pi.pi_date, u_pi.pi_contents, u_pi.pi_answer
from (select u.u_name, pi.*
	from user u join productinquiry pi
    on u.u_id = pi.User_u_id) u_pi join product p on u_pi.Product_p_id = p.p_id
where p_id = 1;

# 상품 문의 댓글 (구매자) 작성
insert into productinquiry(pi_contents, User_u_id, Product_p_id)
values ("총 기장은 어느정도 인가요?", 1, 1);

# 상품 문의 대댓글 (판매자) 작성
update productinquiry
set pi_answer = ""
where pi_id = 1;

# ================= Point =================
# 포인트 관련 Query

# 현재 포인트 조회
select u_point 
from user 
where u_id = 1;

# 포인트 중천 및 사용 내역
select u.u_point, p.*
from user u join point p on u.u_id = p.User_u_id
where u.u_id = 1;


# 포인트 충전
update user
set u_point = u_point + 10000
where u_id = 1;
# 밑에 insert로 포인트 량과 해당 정보를 기입
insert into point(point_title, point_amount, User_u_id)
values ("포인트 충전", 10000, 1);


# 포인트로 상품구매
update user
set u_point = u_point - 10000
where u_id = 1;
# 포인트로 상품을 구매하면 위의 쿼리와 insert로 point 테이블에 상품 번호와 사용자 정보를 기입
insert into point(point_title, point_amount, User_u_id)
values ("블라우스 팝니다.", -10000, 1);



# ================= 마이페이지 구매/판매/활동 목록 =================
# 구매, 판매, 활동 관련 Query

# 구매 목록 - 사용자의 상품 구매 목록을 선택함
select *
from product p
where p.p_id = (
	select o.Product_p_id
    from user u join market.order o on u.u_id = o.User_u_id
    where u.u_id = 1);
    
# 판매 목록 - 사용자가 판매하기 위해 올린 상품들을 선택함
select p.*
from user u join product p on u.u_id = p.User_u_id
where u.u_id = 1;

# 활동 목록
# type = 1 -> 찜한 게시물
select *
from product p
where p.p_id = (
	select sb.Product_p_id
    from user u join shopbasket sb on u.u_id = sb.User_u_id
    where u.u_id = 1 );

# type = 2 -> 댓글 단 게시물
select *
from product p
where p.p_id = (
	select pi.Product_p_id
    from user u join productinquiry pi on u.u_id = pi.User_u_id
    where u.u_id = 1);


# ================= Product =================
# 상품 관련 Query

SELECT * FROM product;
# 상품 등록
insert into product(p_image, p_category1, p_category2, p_title, p_price, p_listprice, p_size, p_status, p_puton_count, p_dirty, p_contents, User_u_id) 
values (null, "카테고리1", "카테고리2", "블라우스 팝니다.", 30000, 100000, "S", "좋음", 10, "N", "많이 입지 않은 블라우스 팝니다.", 1);

# 개별 상품 디테일 - 구매자 이름, 구매자 평점, 제품 관련 정보 전달
select u.u_name, p.* 
from user u join product p on u.u_id = p.User_u_id
where p.p_id = 1;
# 개별상품 디테일 - 조최수 증가를 위한 쿼리
update product
set p_view = p_view + 1
where p_id = 1;

# 개별 상품 디테일에서 구매자 이름 및 평점을 전달하는 쿼리


# HOT item 상위 N개 선택하기
select * 
from product
order by p_view DESC
LIMIT 10;

# 카테고리와 가격 범위 필터에 맞는 상품 반환
# 1 -> 최근 등록순으로 내림차순으로 정렬하여 가격 범위내에 있는 상품들을 선택함
select * 
from product
where (p_price between 0 and 100000) and p_category1 = "" and p_category2 = ""
order by p_date DESC;

# 2 -> 조회가 많은 순으로 내림차순으로 정렬하여 가격 범위내에 있는 상품들을 선택함
select * 
from product
where (p_price between 0 and 100000) and p_category1 = "" and p_category2 = ""
order by p_view DESC;

# 사용자 쪽에서 hot, new item 리스트 반환 
# hot -> 찜 많은 순으로 상품 정보를 출력
select p.*
from (select sb.Product_p_id as hot_p_id, count(*) as hot_p_count
    from shopbasket sb
    group by sb.Product_p_id
    order by count(sb.Product_p_id)) sb join product p on sb.hot_p_id = p.p_id;
    
# new -> 최근 등록 순으로 상품 정보를 출력
select *
from product p
order by p.p_date desc;

# ================= Announce =================
# 공지사항 관련 Query

# 공지사항 리스트 
select * from announce;

# 공지사항 세부조회 - 세부 조회이후 조회수를 증가시키기 위해 update문을 같이 실행하도록 함
select * 
from announce
where post_id = 1;

update announce 
set post_view = post_view + 1
where post_id = 1; # 공지사항 세부조회시 조회수 증가시키는 쿼리

# 공지사항 등록
insert into announce(post_title, post_contents)
values ("", "");

# 공지사항 변경
update announce
set post_title = "" and post_contents = ""
where post_id = 1;

# 공지사항 삭제
delete from announce
where post_id = 1;

# ================= Question =================
# 문의사항 관련 Query

# 1:1 문의 - 사용자 쪽에 1:1 문의 관련 정보를 전달하는 쿼리
select q.q_title, q.q_date, q.q_contents, q.q_answer
from user u join questions q on u.u_id = q.User_u_id
where u.u_id = 1;

# 1:1 문의 작성
insert into questions(q_title, q_contents, User_u_id) 
values ("포인트가 안들어 옵니다.", "거래 확정난지 삼일째인데 포인트가 안들어 옵니다.", 1);

# 문의사항 리스트 조회 - 관리자쪽에서 1:1 문의 온 모든 정보 선택하여 출력함
select u.u_email, q.q_title, q.q_date, q.q_answer
from user u join questions q on u.u_id = q.User_u_id;

# 문의사항 세부사항 조회 - 관리자쪽에서 1:1 문의사항의 세부사항 조회
select u.u_email, q.q_title, q.q_contents, q.q_answer
from user u join questions q on u.u_id = q.User_u_id
where q.q_id = 1;

# 문의사항 답변 등록 - 관리자쪽에서 1:1 문의사항 답변을 작성
update questions
set q_answer = ""
where q_id = 1; 


# ================= 게시물 =================
# 게시물 관련 Query

# 게시물 관리 (게시물 조회) - 관리자에서 현재 게시물에 등록된 모든 상품을 출력함
select p.p_id, u.u_email, p.p_trade, p.p_date
from user u join product p on u.u_id = p.User_u_id;

# 게시물 삭제 - 관리자가 선택한 게시물 삭제
delete from product
where p_id = 1;


# =========================================

# 검색 - 상품의 제목에서 원하는 검색 결과가 있는 상품 정보를 선택함
select p.*
from product p
where trim(p.p_title) like "%팝니다%";

# 찜 - 찜 역할을 하는 shopbasket 테이블에 사용자 번호와 제품 번호를 저장함
insert into shopbasket(User_u_id, Product_p_id)
values (1, 1);


# ==================================================================
# 찜 개수를 선택함
select count(*)
from shopbasket sb join product p on sb.Product_p_id = p.p_id
where p.p_id = ? and p.p_likeitem = 1;

#찜 해제
delete from shopbasket where User_u_id=1 and Product_p_id=1;

#찜 여부 확인(0보다 크면 찜 함.)
SELECT count(*) FROM secondhand.shopbasket where User_u_id=1 and Product_p_id=1;

# 특정 product의 찜 개수 포함한 상세정보 출력
select *, (select count(*) from shopbasket where Product_p_id=1) as likecnt
from product p LEFT JOIN shopbasket on shopbasket.Product_p_id = p.p_id where p.p_id = (select sb.Product_p_id from user u join shopbasket sb on u.u_id = sb.User_u_id where u.u_id = 1);

# ==================================================================
# review 관련 쿼리 
insert into review(re_title, re_contents, re_grade, User_u_id, Product_p_id) values
	("1번 상품 구매함", "너무 좋아요!!!", 3, 3, 1),
    ("2번 상품 구매함", "너무 좋아요!!!", 4, 4, 2),
    ("5번 상품 구매함", "너무 좋아요!!!", 2, 3, 5);
    
select * from review where User_u_id = 3;

# 사용자 평점을 얻는 쿼리
select ifnull(sum(re_grade) / count(*), 0) as u_star
from review
where User_u_id = 4;