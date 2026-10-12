# -*- coding: utf-8 -*-
"""detail_capture — 광고 링크를 제품 페이지별로 묶기(카페24 product_no·짧은 주소·imweb idx), utm 떼기."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "scripts"))

import detail_capture as dc


def test_page_key_cafe24_query_and_slug_path_are_same_product():
    a = dc.page_key("https://inverb.co.kr/product/detail.html?product_no=49&utm_source=instagram")
    b = dc.page_key("https://www.inverb.co.kr/product/%EC%86%90%EA%B0%80%EB%9D%BD/49/category/1/display/2/")
    assert a == b == "inverb.co.kr/product/49"


def test_page_key_short_url_ignores_case_and_mobile_host():
    assert dc.page_key("https://noily.kr/surl/P/26") == dc.page_key("https://m.noily.kr/surl/p/26/") == "noily.kr/surl/P/26"


def test_page_key_keeps_only_product_ids_in_query():
    assert dc.page_key("https://imheal.kr/shop_view/?idx=185&utm_source=ig") == "imheal.kr/shop_view?idx=185"
    assert dc.page_key("https://imheal.kr/shop_view?idx=185") == "imheal.kr/shop_view?idx=185"


def test_clean_url_drops_tracking_only():
    u = dc.clean_url("https://a.kr/product/detail.html?product_no=18&utm_source=fb&fbclid=x&cate_no=3")
    assert u == "https://a.kr/product/detail.html?product_no=18&cate_no=3"


def test_landing_pages_counts_each_ad_once_and_sorts_by_ads_then_days():
    ads = [
        {"id": "1", "days_running": 30, "is_active": True,
         "link_urls": ["https://x.kr/surl/P/1", "https://x.kr/surl/p/1"]},
        {"id": "2", "days_running": 90, "is_active": False, "link_urls": ["https://x.kr/surl/P/2"]},
        {"id": "3", "days_running": 10, "is_active": True, "link_urls": ["https://x.kr/surl/P/1?utm_source=fb"]},
        {"id": "4", "days_running": 500, "is_active": True, "link_urls": ["https://other.com/p/9"]},
    ]
    pages = dc.landing_pages(ads, "x.kr")
    assert [(p["key"], p["ads"], p["longest"], p["active"]) for p in pages] == [
        ("x.kr/surl/P/1", 2, 30, 2), ("x.kr/surl/P/2", 1, 90, 0)]
    assert pages[0]["url"] == "https://x.kr/surl/P/1"
