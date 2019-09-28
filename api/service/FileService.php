<?php
/**
 * Created by PhpStorm.
 * User: yanzhipeng
 * Date: 2019/9/22
 * Time: 6:45 PM
 */

namespace api\service;

use yii\base\Component;
use PhpOffice\PhpSpreadsheet\IOFactory;

class FileService extends  Component {

    protected $_SqlMigrationService = null;
    public function init() {

        parent::init();
        $this->_SqlMigrationService = new SqlMigrationService();
    }

    public function  readExcel($file = '', $file_name = '') {

        if ('' == $file) return false;

        $table_name = "";

        $spreadsheet = IOFactory::load($file);
        $sheet = $spreadsheet->getActiveSheet();

        $row_header = [];
        $normal_row = [];
        foreach ($sheet->getRowIterator() as $row) {

            $row_num = $row->getRowIndex();
            $cellIterator = $row->getCellIterator();
            $cellIterator->setIterateOnlyExistingCells(false);

            $current_row = [];
            foreach ($cellIterator as $cell) {
                $cell_value = $cell->getCalculatedValue();
                if (1 == $row_num) {
                    array_push($row_header, $cell_value);
                } else {
                    array_push($current_row, $cell_value);
                }
            }

            if (!empty($row_header) && 1 ==  $row_num) { // 创建数据表
                $res_create_table = $this->_SqlMigrationService->createFileTable($row_header, 1001, $file_name);
                if (!$res_create_table) return false;
                $table_name = $res_create_table['table_name'] ?? "";
            }

            if (!empty($current_row)) {
                array_push($normal_row, $current_row);
            }

            // 批量插入500条
            if (sizeof($normal_row) >= 500) {
                // 批量插入数据库 同时清空数组
                $res_insert = $this->_SqlMigrationService->batchInsertData($table_name, $row_header, $normal_row);
                if ($res_insert) { // 清空旧数据
                    $normal_row = [];
                } else return false;
            }

            if (!empty($normal_row)) { // 小500了 最后的一丢丢小数据
                $res_insert = $this->_SqlMigrationService->batchInsertData($table_name, $row_header, $normal_row);
                if ($res_insert) { // 清空旧数据
                    $normal_row = [];
                } else return false;
            }

        }

        if (empty($normal_row)) { // 任务已完成
            return true;
        } else return false;

    }

}