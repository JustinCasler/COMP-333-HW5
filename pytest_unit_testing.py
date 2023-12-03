from unit_testing_sample_code import string_capitalizer, capitalize_list, integer_manipulator, manipulate_list

def test_string_capitalizer():
    assert string_capitalizer("two") == "TwO"
    assert string_capitalizer("c") == "C"
    assert string_capitalizer(4) == "FouR"
    assert string_capitalizer("") == ""

def test_capitalize_list():
    assert capitalize_list(["two", "c", 4, ""]) == ["TwO", "C", "FouR", ""]

def test_integer_manipulator():
    assert integer_manipulator(10) == 66
    assert integer_manipulator(2) == 2
    assert integer_manipulator(3) == 6
    assert integer_manipulator(0) == 0
    assert integer_manipulator("three") == 1

def test_manipulate_list():
    assert manipulate_list([10, 2, 3, 0, "three"]) == [66, 2, 6, 0, 1]